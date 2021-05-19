from .serializer import GetDashaSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from datetime import datetime


class GetDashaView(APIView):

    serializer_class = GetDashaSerializer

    def calculate(self, first_cal_date, expect_date, data: list[dict[str, int]], index, interval):

        next_date: datetime = None
        prev_date = first_cal_date

        interval: float = interval / 120

        if self.call == 0:
            return

        self.call -= 1

        self.response_data.append("-" * 50)

        while not next_date or next_date < expect_date:

            if index == len(data):
                index = 0

            if interval == 1:

                next_date = prev_date.replace(
                    year=prev_date.year + list(data[index].values())[0])

            else:

                days = list(data[index].values())[0] * interval

                next_date = prev_date + days

            self.response_data.append(
                str(next_date) + " \t ===>>> \t " + str(list(data[index].keys())[0]))

            if not next_date < expect_date:

                self.result.append(list(data[index].keys())[0])

                self.calculate(prev_date, expect_date, data,
                               index, next_date - prev_date)

            index += 1

            prev_date = next_date

    def main(self, start_date, start_time, exp_date, exp_time, planet):

        import datetime as dt

        start_date = [int(i) for i in start_date.split("-")]

        start_time = [int(i) for i in start_time.split(":")]

        expect_date = [int(i) for i in exp_date.split("-")]

        expect_time = [int(i) for i in exp_time.split(":")]

        start_planet: str = planet

        total: int = 120

        index: int

        data: list = [
            {
                'ketu': 7
            },
            {
                'sukra': 20
            },
            {
                'surya': 6
            },
            {
                'chandra': 10
            },
            {
                'mangal': 7
            },
            {
                'rahu': 18
            },
            {
                'guru': 16
            },
            {
                'shani': 19
            },
            {
                'budh': 17
            },
        ]

        for planet in data:
            if planet.__contains__(start_planet):

                index = data.index(planet)

        start_date = dt.datetime(start_date[0], start_date[1], start_date[2],
                                 start_time[0], start_time[1], 0)

        expect_date = dt.datetime(expect_date[0], expect_date[1], expect_date[2],
                                  expect_time[0], expect_time[1], 0)

        self.calculate(start_date, expect_date, data, index, total)

    def post(self, request, format=None):

        self.response_data = []

        self.result = []

        self.call = 6

        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():

            return Response({"Error": "error"},
                            status=status.HTTP_400_BAD_REQUEST)

        start_date = serializer.validated_data.get('start_date')
        start_time = serializer.validated_data.get('start_time')
        exp_date = serializer.validated_data.get('exp_date')
        exp_time = serializer.validated_data.get('exp_time')
        planet = serializer.validated_data.get('planet')

        self.main(start_date, start_time, exp_date, exp_time, planet)

        return Response({"planets": self.result,
                         "timeline": self.response_data},
                        status=status.HTTP_200_OK)

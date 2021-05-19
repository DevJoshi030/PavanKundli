from rest_framework import serializers


class GetDashaSerializer(serializers.Serializer):

    start_date = serializers.CharField()
    start_time = serializers.CharField()
    exp_date = serializers.CharField()
    exp_time = serializers.CharField()
    planet = serializers.CharField()

from .views import GetDashaView
from django.urls import path

urlpatterns = [
    path("get-dasha/", GetDashaView.as_view(), name="get-dasha")
]

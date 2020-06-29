from django.conf.urls import url, include
from django.contrib import admin
from .views import ImageCropper, upload_image

urlpatterns = [
    url(r'^$', ImageCropper.as_view(), name='homapage'),
    url(r'upload-image/', upload_image, name='upload_image'),
]

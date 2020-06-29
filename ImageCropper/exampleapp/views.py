# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from django.views.decorators.csrf import csrf_exempt


class ImageCropper(View):
    def get(self, request):
        return render(request, 'ImageCropper/index.html')


@csrf_exempt
def upload_image(request):
    fs = FileSystemStorage()
    try:
        if request.FILES.get('cropped_image'):
            file_obj = request.FILES['cropped_image']
            file_name = 'email_cover_image.png'
            filename = fs.save(file_name, file_obj)
            file_path = fs.url(filename)
            return JsonResponse({
                'status': 'success',
                'message': 'Image Uploaded Successfully',
                'url': file_path
            })
    except Exception as E:
        print(E)
    return JsonResponse({
        'status': 'failed',
        'message': 'failed_to_upload_image'
    })

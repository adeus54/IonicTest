# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from .serializers import LoginSerializer
from django.contrib.auth import login as django_login, logout as django_logout
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from .models import *

from .serializers import FichaEmergenciaSerializer
from .serializers import EstadoSerializer
from .serializers import RetroalimentacionSerializer
from .serializers import UsuarioSerializer
from .serializers import InstitucionSerializer
from .serializers import RecursoSerializer
from .serializers import AsignacionEmergenciaSerializer

# Create your views here.


class FichaEmergenciaViewSet(viewsets.ModelViewSet):
    queryset = FichaEmergencia.objects.all()
    serializer_class = FichaEmergenciaSerializer


class EstadoViewSet(viewsets.ModelViewSet):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer


class RetroalimentacionViewSet(viewsets.ModelViewSet):
    queryset = Retroalimentacion.objects.all()
    serializer_class = RetroalimentacionSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        django_login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=200)


class InstitucionViewSet(viewsets.ModelViewSet):
    queryset = Institucion.objects.all()
    serializer_class = InstitucionSerializer


class RecursoViewSet(viewsets.ModelViewSet):
    queryset = Recurso.objects.all()
    serializer_class = RecursoSerializer


class AsignacionEmergenciaViewSet(viewsets.ModelViewSet):
    queryset = AsignacionEmergencia.objects.all()
    serializer_class = AsignacionEmergenciaSerializer

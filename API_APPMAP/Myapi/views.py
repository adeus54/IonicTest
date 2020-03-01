# -*- coding: utf-8 -*-

from rest_framework import viewsets
from rest_framework.views import APIView

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
from .serializers import LoginSerializer

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.views.generic.list import ListView


# Create your views here.


class FichaEmergenciaViewSet(viewsets.ModelViewSet):
    permission_classes = []
    queryset = FichaEmergencia.objects.all()
    serializer_class = FichaEmergenciaSerializer


class EstadoViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer

    def get_permissions(self):
        if self.action == 'retrieve':
            permission_classes = []
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]


class RetroalimentacionViewSet(viewsets.ModelViewSet):
    permission_classes = []
    queryset = Retroalimentacion.objects.all()
    serializer_class = RetroalimentacionSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes = []
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()


class LoginView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        test = UsuarioSerializer(user)
        django_login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "username": test.data}, status=200)


class InstitucionViewSet(viewsets.ModelViewSet):
    permission_classes = []
    queryset = Institucion.objects.all()
    serializer_class = InstitucionSerializer


class RecursoViewSet(viewsets.ModelViewSet):
    permission_classes = []
    queryset = Recurso.objects.all()
    serializer_class = RecursoSerializer


class AsignacionEmergenciaViewSet(viewsets.ModelViewSet):
    permission_classes = []
    queryset = AsignacionEmergencia.objects.all()
    serializer_class = AsignacionEmergenciaSerializer

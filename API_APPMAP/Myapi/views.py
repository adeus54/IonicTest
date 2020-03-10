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
from .serializers import AsignacionReadSerializer

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.views.generic.list import ListView


# Create your views here.


class FichaEmergenciaViewSet(viewsets.ModelViewSet):
    serializer_class = FichaEmergenciaSerializer
    queryset = FichaEmergencia.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = []
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class EstadoViewSet(viewsets.ModelViewSet):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class RetroalimentacionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Retroalimentacion.objects.all()
    serializer_class = RetroalimentacionSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]



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
    queryset = Institucion.objects.all()
    serializer_class = InstitucionSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class RecursoViewSet(viewsets.ModelViewSet):
    queryset = Recurso.objects.all()
    serializer_class = RecursoSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class AsignacionEmergenciaViewSet(viewsets.ModelViewSet):
    serializer_class = AsignacionEmergenciaSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        user = self.request.user
        # id del estado que da por concluida la emergencia
        estadofinal = 6

        terminadas = Retroalimentacion.objects.filter(usuario=user, estado=estadofinal).values("emergencia")

        return AsignacionEmergencia.objects.filter(asignacion=user).exclude(emergencia__in=terminadas)

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            
            return AsignacionReadSerializer
        return AsignacionEmergenciaSerializer

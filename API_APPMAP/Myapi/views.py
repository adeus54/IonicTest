# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets
from .models import FichaEmergencia
from .models import Estado
from .models import Retroalimentacion
from .models import Usuario
from .models import Institucion
from .models import Recurso
from .models import AsignacionEmergencia

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
    serializer_class = FichaEmergenciaSerializer.data


class EstadoViewSet(viewsets.ModelViewSet):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer


class RetroalimentacionViewSet(viewsets.ModelViewSet):
    queryset = Retroalimentacion.objects.all()
    serializer_class = RetroalimentacionSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class InstitucionViewSet(viewsets.ModelViewSet):
    queryset = Institucion.objects.all()
    serializer_class = InstitucionSerializer


class RecursoViewSet(viewsets.ModelViewSet):
    queryset = Recurso.objects.all()
    serializer_class = RecursoSerializer


class AsignacionEmergenciaViewSet(viewsets.ModelViewSet):
    queryset = AsignacionEmergencia.objects.all()
    serializer_class = AsignacionEmergenciaSerializer

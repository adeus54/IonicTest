# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets
from .models import FichaEmergencia
from .models import Estado
from .models import Retroalimentacion

from .serializers import FichaEmergenciaSerializer
from .serializers import EstadoSerializer
from .serializers import RetroalimentacionSerializer
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
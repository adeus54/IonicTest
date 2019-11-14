# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db import models


# Create your models here.


class FichaEmergencia(models.Model):
    fecha_e = models.DateField()
    hora = models.TimeField()
    telefono = models.CharField(max_length=10)
    alerta = models.CharField(max_length=30)
    description = models.TextField()
    coorX = models.FloatField()
    coorY = models.FloatField()


class Estado(models.Model):
    tipo = models.CharField(max_length=15)

    def __str__(self):
        return self.tipo


class Retroalimentacion(models.Model):
    idemrg = models.ForeignKey(FichaEmergencia, related_name='FichaEmergencia', on_delete=models.CASCADE)
    idestado = models.ForeignKey(Estado, related_name='Estado', on_delete=models.CASCADE)
    retro_A = models.CharField(max_length=100)
    fecha_r = models.DateField()
    hora = models.TimeField()

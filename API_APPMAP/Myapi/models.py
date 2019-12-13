# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db import models


# Create your models here.
class FichaEmergencia(models.Model):
    TIPO_LLAMADA = [
        (1, 'Celular'),
        (2, 'Telefono Fijo'),
    ]
    CLAVE_ALARMA = [
        (1, 'Clave Amarilla'),
        (2, 'Clave Roja'),
    ]
    titulo = models.CharField(max_length=30, default='')
    telefono = models.CharField(max_length=10, default='')
    tipollamada = models.CharField(max_length=10, choices=TIPO_LLAMADA, default=1,)
    fecha_e = models.DateField()
    hora = models.TimeField()
    provincia = models.CharField(max_length=25, default='')
    canton = models.CharField(max_length=30, default='')
    direccionReporte = models.CharField(max_length=50, default='')
    direccionIncidente = models.CharField(max_length=50, default='')
    description = models.TextField()
    operador = models.CharField(max_length=50, default='')
    reportador = models.CharField(max_length=50, default='')
    alerta = models.CharField(max_length=30, choices=CLAVE_ALARMA, default=3,)
    coorX = models.FloatField()
    coorY = models.FloatField()


class Estado(models.Model):
    tipo = models.CharField(max_length=15)


class Retroalimentacion(models.Model):
    idemrg = models.ForeignKey(FichaEmergencia, related_name='FichaEmergencia', on_delete=models.CASCADE)
    idestado = models.ForeignKey(Estado, related_name='Estado', on_delete=models.CASCADE)
    retro_A = models.CharField(max_length=100)
    fecha_r = models.DateField()
    hora = models.TimeField()


class Institucion(models.Model):
    nombre = models.CharField(max_length=100)
    description = models.CharField(max_length=100, default='')


class Recurso(models.Model):
    unidad = models.CharField(max_length=100)
    institucion = models.ForeignKey(Institucion, related_name='Institucion', on_delete = models.CASCADE, default='')


class Usuario(models.Model):
    id_user = models.CharField(max_length=100, primary_key=True, default='')
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    institucion = models.ForeignKey(Institucion, on_delete=models.CASCADE, default='')
    recurso = models.ForeignKey(Recurso, related_name='Recurso', on_delete=models.CASCADE, default='')


class AsignacionEmergencia(models.Model):
    emergencia = models.ForeignKey(FichaEmergencia, related_name='FichEmergencia', on_delete=models.CASCADE)
    asignacion = models.ForeignKey(Usuario, related_name='Usuario', on_delete=models.CASCADE)

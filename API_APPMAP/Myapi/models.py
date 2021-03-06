# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, AbstractUser


# Create your models here.
class FichaEmergencia(models.Model):
    TIPO_LLAMADA = (
        ('CELULAR', 'Celular'),
        ('TELEFONO', 'Telefono Fijo'),
    )
    CLAVE_ALARMA = (
        ('AMARILLA', 'Clave Amarilla'),
        ('ROJA', 'Clave Roja'),
    )
    titulo = models.CharField(max_length=150, default='')
    telefono = models.CharField(max_length=10, default='')
    tipollamada = models.CharField(max_length=30, choices=TIPO_LLAMADA)
    fecha_e = models.DateField()
    hora = models.TimeField()
    provincia = models.CharField(max_length=25, default='')
    canton = models.CharField(max_length=30, default='')
    direccionReporte = models.CharField(max_length=50, default='')
    direccionIncidente = models.CharField(max_length=50, default='')
    description = models.TextField()
    operador = models.CharField(max_length=50, default='')
    reportador = models.CharField(max_length=50, default='')
    alerta = models.CharField(max_length=30, choices=CLAVE_ALARMA)
    longitud = models.FloatField()
    latitud = models.FloatField()

    def __str__(self):
        return self.titulo


class Estado(models.Model):
    tipo = models.CharField(max_length=15)

    def __str__(self):
        return self.tipo


class Institucion(models.Model):
    nombre = models.CharField(max_length=100)
    description = models.CharField(max_length=100, default='')

    def __str__(self):
        return self.nombre


class Recurso(models.Model):
    unidad = models.CharField(max_length=100)
    institucion = models.ForeignKey(Institucion, related_name='Institucion', on_delete = models.CASCADE, default='')

    def __str__(self):
        return self.unidad


class Usuario(AbstractUser):
    id_user = models.CharField(max_length=10, primary_key=True, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    institucion = models.ForeignKey(Institucion, on_delete=models.CASCADE, null=True)
    recurso = models.ForeignKey(Recurso, related_name='Recurso', on_delete=models.CASCADE, null=True)

    USERNAME_FIELD = 'username'

    REQUIRED_FIELDS = ['id_user', 'first_name', 'last_name']

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class Retroalimentacion(models.Model):
    emergencia = models.ForeignKey(FichaEmergencia, related_name='ficha', on_delete=models.CASCADE)
    estado = models.ForeignKey(Estado, related_name='Estado', on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, related_name='reporta', on_delete=models.CASCADE)
    Descripcion = models.CharField(max_length=100)
    fecha = models.DateField(auto_now_add=True)
    hora = models.TimeField(auto_now=True)

    def __str__(self):
        return self.emergencia.titulo+ ' - ' + self.estado.tipo


class AsignacionEmergencia(models.Model):
    emergencia = models.ForeignKey(FichaEmergencia, related_name='FichEmergencia', on_delete=models.CASCADE)
    asignacion = models.ForeignKey(Usuario, related_name='Usuario', on_delete=models.CASCADE)

    def __str__(self):
        return self.emergencia.titulo+ ' -> ' + self.asignacion.__str__()
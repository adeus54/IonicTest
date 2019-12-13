from rest_framework import serializers
from .models import FichaEmergencia
from .models import Estado
from .models import Retroalimentacion
from .models import Usuario
from .models import Institucion
from .models import Recurso
from .models import AsignacionEmergencia
from django.contrib.auth.models import User


class FichaEmergenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FichaEmergencia
        fields = ('titulo',
                  'telefono',
                  'tipollamada',
                  'fecha_e',
                  'hora',
                  'provincia',
                  'canton',
                  'direccionReporte',
                  'direccionIncidente',
                  'description',
                  'operador',
                  'reportador',
                  'alerta',
                  'coorX',
                  'coorY')


class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = "__all__"


class RetroalimentacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retroalimentacion
        fields = ('idemrg', 'idestado', 'retro_A', 'fecha_r', 'hora')


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id_user', 'nombres', 'apellidos', 'username', 'password', 'institucion', 'recurso')

    def create(self, validate_data):
        instance = User()
        instance.first_name = validate_data.get('nombres')
        instance.last_name = validate_data.get('apellidos')
        instance.username = validate_data.get('username')
        instance.set_password(validate_data.get('password'))
        instance.save()
        return instance

    def validated_data(self, data):
        users = User.objects.filter(username=data)
        if len(users) != 0:
            raise serializers.ValidationError('Usuario ya exitente')
        else:
            return data


class InstitucionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institucion
        fields = ('nombre', 'description')


class RecursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recurso
        fields = ('unidad', 'institucion')


class AsignacionEmergenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignacionEmergencia
        fields = ('emergencia', 'asignacion')
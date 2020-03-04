from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from .models import FichaEmergencia
from .models import Estado
from .models import Retroalimentacion
from .models import Usuario
from .models import Institucion
from .models import Recurso
from .models import AsignacionEmergencia
from django.contrib.auth import authenticate
from rest_framework import exceptions


class RetroalimentacionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Retroalimentacion
        fields = ('emergencia','usuario', 'estado', 'Descripcion', 'fecha', 'hora')
        validators = [
            UniqueTogetherValidator(
                queryset=Retroalimentacion.objects.all(),
                fields=['emergencia', 'usuario', 'estado']
            )
        ]


class FichaEmergenciaSerializer(serializers.ModelSerializer):
    #ficha = RetroalimentacionSerializer(many=True, read_only=True)
    #tipollamada = serializers.CharField(source='get_tipollamada_display')
    class Meta:
        model = FichaEmergencia
        fields = ('id', 'titulo', 'telefono', 'tipollamada', 'fecha_e', 'hora', 'provincia', 'canton',
                  'direccionReporte', 'direccionIncidente', 'description', 'operador', 'reportador', 'alerta',
                  'longitud',
                  'latitud')#, 'ficha')



class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = ('id', 'tipo')


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id_user', 'first_name', 'last_name', 'username', 'password', 'institucion', 'recurso')
        #extra_kwargs = {
            #'password': {'write_only': True}
        #}

    def save(self):
        usuario = Usuario(
                    id_user=self.validated_data['id_user'],
                    username=self.validated_data['username'],
                    first_name=self.validated_data['first_name'],
                    last_name=self.validated_data['last_name'],
                    institucion=self.validated_data['institucion'],
                    recurso=self.validated_data['recurso'],
            )
        password = self.validated_data['password']
        usuario.set_password(password)
        usuario.save()
        return usuario


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username", "")
        password = data.get("password", "")

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data["user"] = user
                else:
                    raise exceptions.ValidationError("Usuario esta desactivado")
            else:
                raise exceptions.ValidationError("Los datos son incorrectos")
        else:
            raise exceptions.ValidationError("No se deben dejar campos sin llenar")
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
    #emergencia = FichaEmergenciaSerializer(many=False, read_only=True)
    #asignacion = UsuarioSerializer(many=False, read_only=True)

    class Meta:
        model = AsignacionEmergencia
        fields = ('emergencia', 'asignacion')
        #depth = 1
        validators = [
            UniqueTogetherValidator(
                queryset=AsignacionEmergencia.objects.all(),
                fields=['emergencia', 'asignacion']
            )
        ]
from rest_framework import serializers
from .models import FichaEmergencia
from .models import Estado
from .models import Retroalimentacion


class FichaEmergenciaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FichaEmergencia
        fields = ('fecha_e', 'hora', 'telefono', 'alerta', 'description', 'coorX', 'coorY')


class EstadoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Estado
        fields = "__all__"


class RetroalimentacionSerializer(serializers.HyperlinkedModelSerializer):


    class Meta:
        model = Retroalimentacion
        fields = ('idemrg', 'idestado', 'retro_A', 'fecha_r', 'hora')
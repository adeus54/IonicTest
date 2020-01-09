# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib import admin
from .models import FichaEmergencia
from .models import Estado
from .models import Retroalimentacion
from .models import Usuario
from .models import Institucion
from .models import Recurso
from .models import AsignacionEmergencia

# Register your models here.

admin.site.register(FichaEmergencia)
admin.site.register(Estado)
admin.site.register(Retroalimentacion)
admin.site.register(Usuario)
admin.site.register(Institucion)
admin.site.register(Recurso)
admin.site.register(AsignacionEmergencia)

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib import admin
from .models import FichaEmergencia
from .models import Estado
from .models import Retroalimentacion

# Register your models here.

admin.site.register(FichaEmergencia)
admin.site.register(Estado)
admin.site.register(Retroalimentacion)

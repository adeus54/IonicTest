from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'fichaemergencias', views.FichaEmergenciaViewSet)
router.register(r'estados', views.EstadoViewSet)
router.register(r'retroalimentacions', views.RetroalimentacionViewSet)
router.register(r'usuario', views.UsuarioViewSet)
router.register(r'institucion', views.InstitucionViewSet)
router.register(r'recurso', views.RecursoViewSet)
router.register(r'asignacionemergencia', views.AsignacionEmergenciaViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.views.generic.base import TemplateView

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'django_bpms.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^dashboard/', TemplateView.as_view(template_name='test.html')),
)

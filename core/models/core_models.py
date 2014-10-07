__author__ = 'soroosh'
from core.models.process_models import Activity
from django.db import models


class Project(models.Model):
    class Meta:
        app_label = 'core'
    pass


class App(models.Model):
    class Meta:
        app_label = 'core'
    pass


class DataModel(models.Model):
    class Meta:
        app_label = 'core'
    pass







from jsonfield import JSONField

__author__ = 'soroosh'
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


class FieldValidation(models.Model):
    class Meta:
        app_label = 'core'

    name = models.CharField(max_length=90)
    data = JSONField()


class FieldType(models.Model):
    class Meta:
        app_label = 'core'

    name = models.CharField(max_length=90)
    default_validation = models.ManyToManyField(FieldValidation)


class Field(models.Model):
    class Meta:
        app_label = 'core'

    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    type = models.ForeignKey(FieldType)
    order = models.IntegerField(default=1)
    data_model = models.ForeignKey(DataModel)

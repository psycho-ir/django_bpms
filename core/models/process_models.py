from jsonfield import JSONField

__author__ = 'soroosh'

from django.db import models


class RelationType(models.Model):
    pass


class Relation(models.Model):
    from_activity = models.ForeignKey(Activity)
    to_activity = models.ForeignKey(Activity)
    relation_type = models.ForeignKey(RelationType)


class Process(models.Model):
    pass


class ActivityType(models.Model):
    pass


class Activity(models.Model):
    type = models.ForeignKey(ActivityType)
    process = models.ForeignKey(Process)
    data = JSONField()



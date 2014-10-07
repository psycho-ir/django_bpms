from jsonfield import JSONField

__author__ = 'soroosh'

from django.db import models


class RelationType(models.Model):
    class Meta:
        app_label = 'core'

    pass


class Process(models.Model):
    class Meta:
        app_label = 'core'

    pass


class ActivityType(models.Model):
    class Meta:
        app_label = 'core'

    pass


class Activity(models.Model):
    class Meta:
        app_label = 'core'

    type = models.ForeignKey(ActivityType)
    process = models.ForeignKey(Process)
    data = JSONField()


class Relation(models.Model):
    class Meta:
        app_label = 'core'

    from_activity = models.ForeignKey(Activity, related_name='from_relations')
    to_activity = models.ForeignKey(Activity, related_name='to_relations')
    relation_type = models.ForeignKey(RelationType)


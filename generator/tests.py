from django.test import TestCase
import project_generator
from django.conf import settings
import os

project_name = 'test'


class ProjectGeneratorTestCase(TestCase):
    def test_creates_dir_correctly(self):
        project_generator.create_project(project_name)
        project_address = os.path.join(settings.OUTPUT_ADDRESS, project_name)
        self.assertTrue(os.path.isdir(project_address))

    def test_create_managepy_correctly(self):
        project_generator.create_managepy_file(project_name)

    def test_add_managepy_correctly(self):
        project_generator.add_managepy_file(project_name)

    def test_create_core_package_correctly(self):
        project_generator.create_core_package(project_name)

    def test_create_urls_correctly(self):
        project_generator.create_urls(project_name)








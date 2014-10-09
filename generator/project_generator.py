from django.template import loader, Context
from generator.util import create_file

__author__ = 'soroosh'

from django.conf import settings
import os

output_address = settings.OUTPUT_ADDRESS


def create_project(project_name):
    project_address = os.path.join(output_address, project_name)
    if os.path.isdir(project_address):
        os.rmdir(project_address)

    try:
        os.makedirs(project_address)
    except Exception as e:
        pass


def create_managepy_file(project_name):
    try:
        template = loader.get_template('manage.tmpl')
    except Exception as e:
        pass
    return template.render(Context({'project_name': project_name}))


def add_managepy_file(project_name):
    file_content = create_managepy_file(project_name)
    create_file(os.path.join(output_address, project_name), 'manage.py', file_content)


def create_core_package(project_name):
    core_package_address = os.path.join(output_address, project_name, project_name)
    os.mkdir(core_package_address)

    open(os.path.join(core_package_address, '__init__.py'), 'w+')


def create_urls(project_name):
    core_package_address = os.path.join(output_address, project_name, project_name)
    template = loader.get_template('urls.tmpl')
    content = template.render(Context({}))
    create_file(core_package_address, 'urls.py', content)






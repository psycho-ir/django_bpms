__author__ = 'soroosh'
import os


def create_file(address, name, content):
    file_address = os.path.join(address, name)
    with open(file_address, mode='w') as file:
        file.writelines(content)


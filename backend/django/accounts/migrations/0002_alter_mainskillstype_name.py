# Generated by Django 4.2 on 2023-06-07 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mainskillstype',
            name='name',
            field=models.CharField(max_length=256),
        ),
    ]

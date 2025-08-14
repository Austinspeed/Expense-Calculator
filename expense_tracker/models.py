from django.db import models

# Create your models here.
class Finance(models.Model):
    balance = models.FloatField()
    income = models.FloatField()
    expense = models.FloatField()
    description = models.CharField()
    amount = models.FloatField()
    

"""Chart Models

A model is the single, definitive source of information about your data.
It contains the essential fields and behaviors of the data you’re storing.
Generally, each model maps to a single database table.
"""


from django.db import models


class Chart(models.Model):
    """Creates a model"""
    creation_dateTime = models.DateTimeField(auto_now=True,)
    date = models.DateField(blank=False, unique=True)
    rate = models.DecimalField(max_digits=6, decimal_places=2, blank=False)

    def __str__(self):
        """To represent objects in the admin interface"""
        return self.name

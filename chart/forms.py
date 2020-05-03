"""Chart Forms

Form class describes a form and determines how it works and appears.
In a similar way that a model class’s fields map to database fields,
a form class’s fields map to HTML form <input> elements.
"""


from django import forms
from .models import Chart


class ChartForm(forms.ModelForm):
    """
    Creates a form by using the Chart model

    clean_rate()
        Raises ValidationError and returns the clean data,
        which is then inserted into the cleaned_data dictionary of the form
    """

    def clean_rate(self):
        """Validates rate field"""
        data = self.cleaned_data['rate']
        if data <= 0:
            raise forms.ValidationError("Currency rate cant`t be less or equal to zero!")

        # Always return a value to use as the new cleaned data, even if
        # this method didn't change it.
        return data

    class Meta:
        """Provides metadata to the ModelForm class"""
        model = Chart
        fields = ('date', 'rate')
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date', 'placeholder': 'mm/dd/yyyy'}),
            'rate': forms.NumberInput(attrs={'placeholder': 'Rate'})
        }


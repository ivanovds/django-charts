"""Chart Views

This file contains view functions that takes a Web request and returns a Web response.
"""


from django.http import JsonResponse
from .forms import ChartForm
from .models import Chart
from django.views.generic import FormView


class ChartFormView(FormView):
    """A view that displays a form.

    * On error, redisplays the form with validation errors.
    * On success, saves data to database, returns success message.
    """

    form_class = ChartForm
    template_name = 'chart.html'
    success_url = '/form-success/'

    def form_invalid(self, form):
        """Is called when invalid form data has been POSTed."""
        response = super(ChartFormView, self).form_invalid(form)
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return response

    def form_valid(self, form):
        """Is called when valid form data has been POSTed."""
        form.save()
        response = super(ChartFormView, self).form_valid(form)
        if self.request.is_ajax():
            print(form.cleaned_data)
            data = {
                'message': "You successfully saved USD rate",
            }
            return JsonResponse(data)
        else:
            return response


def currency_chart(request):
    """A view that displays a chart."""
    label = []
    data = []

    queryset = Chart.objects.filter().order_by('date')
    for entry in queryset:
        label.append(str(entry.date))
        data.append(str(entry.rate))

    # is used to hide empty chart
    chart_empty = chart_empty_check(queryset);

    return JsonResponse(data={
        'labels': label,
        'data': data,
        'chart_empty': chart_empty,
    })


def chart_empty_check(queryset):
    return True if len(queryset) == 0 else False


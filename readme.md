CMD:_ pip install djangorestframework



REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny', # Abhi ke liye API sabke liye khuli hai
    ]
}


Serializer Banana (DRF ki file): Hum ek nayi file banayenge (serializers.py). Yahan DRF database ke products ko JSON text mein badlega.

pip install django-cors-headers

CORS Library Install Karein

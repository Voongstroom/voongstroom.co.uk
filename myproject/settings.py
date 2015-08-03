"""
Django settings for myproject project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '=rc=_hmr34fnolz)hi8$z!nb$%rf^k63rbu5jx^#8=hk*e7j3)'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []

# # django-allauth stuff
# TEMPLATE_CONTEXT_PROCESSORS = (
#     # Required by allauth template tags
#     "django.core.context_processors.request",
#     # allauth specific context processors
#     "allauth.account.context_processors.account",
#     "allauth.socialaccount.context_processors.socialaccount",
#     "django.contrib.auth.context_processors.auth",
# )
# AUTHENTICATION_BACKENDS = (
#     # Needed to login by username in Django admin, regards of `allauth`
#     "django.contrib.auth.backends.ModelBackend",
#     # `allauth` specific authentication methods, such as login by e-mail
#     "allauth.account.auth_backends.AuthenticationBackend",
# )

# # auth and allauth settings
# LOGIN_REDIRECT_URL = '/vocab'
# SOCIALACCOUNT_QUERY_EMAIL = True
# SOCIALACCOUNT_PROVIDERS = {
#     'facebook': {
#         'SCOPE': ['email', 'publish_stream'],
#         'METHOD': 'js_sdk' # instead of oauth2
#     }
# }

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.i18n',
    'django.core.context_processors.request',
    'zinnia.context_processors.version',  # Optional
)

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'vocab',
    'dino_fitness',
    'myproject',
    # 'friendship',
    # 'django.contrib.sites',
    # 'allauth',
    # 'allauth.account',
    # 'allauth.socialaccount',
    # 'allauth.socialaccount.providers.facebook',
    # 'allauth.socialaccount.providers.google',
    # apps for zinnia
    'django.contrib.sites',
    'django_comments',
    'mptt',
    'tagging',
    'zinnia',
)

# more django-allauth
SITE_ID = 5

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'myproject.urls'

WSGI_APPLICATION = 'myproject.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases

DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
            'NAME': 'mydb',                      # Or path to database file if using sqlite3.
            # The following settings are not used with sqlite3:
            'USER': 'dvoong',
            'PASSWORD': 's9gj=dBe',
            'HOST': 'localhost',                      # Empty for localhost through domain sockets or           '127.0.0.1' for localhost through TCP.
            'PORT': '',                      # Set to empty string for default.
        }
    }

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

STATIC_URL = '/static/'
# STATIC_URL = "/home/dvoong/myproject/"
# STATIC_URL = "/opt/myenv/static"
# STATIC_ROOT = "/var/www/voongstroom.co.uk/static/"
STATIC_ROOT = "/opt/myenv/static/"
STATICFILES_DIRS = (os.path.join(BASE_DIR, "vocab/static"),)

from ._patient import DigitalPatient
from .conformal import cp, base, evaluation, icp

from digital_patient._version import __version__

__all__ = [
    'DigitalPatient',
    'cp', 'base', 'evaluation', 'icp',
    '__version__'
]

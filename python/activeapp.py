def install(package):
    if hasattr(pip, 'main'):
        pip.main(['install', package])
    else:
        pip._internal.main(['install', package])

def install_and_import(package):
    import importlib
    try:
        importlib.import_module(package)
    except ImportError:
        import pip
        install(package)
    finally:
        globals()[package] = importlib.import_module(package)


install_and_import('pygetwindow')

print(pygetwindow.getActiveWindow().title)
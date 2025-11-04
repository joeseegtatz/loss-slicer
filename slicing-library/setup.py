from setuptools import setup

setup(
    name="pysclice",
    version="0.1.1",
    description="PySlice: A library for neural network loss landscape analysis",
    author="Joe",
    packages=["pysclice", "pysclice.core", "pysclice.slicers", "pysclice.visualization"],
    install_requires=[
        "numpy>=2.0.0,<3.0.0",
        "torch>=2.0.0,<=2.9.0",
        "matplotlib>=3.10.0,<=3.10.7",
        "skikit-optimize=0.10.2",
    ],
    python_requires=">=3.7",
)

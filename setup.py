from setuptools import setup, find_packages

setup(
    name="pysclice",
    version="0.1.0",
    description="PySlice: A library for neural network loss landscape analysis",
    author="Joe",
    packages=["pysclice", "pysclice.core", "pysclice.slicers", "pysclice.visualization", "pysclice.utils"],
    install_requires=[
        "numpy",
        "torch",
        "matplotlib",
    ],
    python_requires=">=3.7",
)

from setuptools import setup, find_packages

setup(
    name="pysclice",
    version="0.1.1",
    description="PySlice: A library for neural network loss landscape analysis",
    author="Joe",
    packages=["pysclice", "pysclice.core", "pysclice.slicers", "pysclice.visualization"],
    install_requires=[
        "numpy",
        "torch",
        "matplotlib",
    ],
    python_requires=">=3.7",
)

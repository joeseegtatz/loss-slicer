# Development Guide

## Development Environment Setup

### Prerequisites
- Python 3.7+
- Node.js and npm (for TensorBoard plugin frontend)
- Git

### Initial Setup

1. **Clone and install the core library**:
```bash
# Install dependencies
pip install -r requirements.txt

# Install in development mode
pip install -e .
```

2. **Install TensorBoard plugin**:
```bash
cd tensorboard_plugin
pip install -e .
```

3. **Frontend development** (if working on the plugin UI):
```bash
cd tensorboard_plugin/tensorboard_loss_slicer/frontend
npm install
```

## Development Workflow

### Core Library Development

#### Code Organization
- **`pysclice/core/`**: Core abstractions and utilities
- **`pysclice/slicers/`**: Slicing algorithm implementations
- **`pysclice/visualization/`**: Plotting and display utilities

#### Best Practices

##### 1. **Adding New Slicing Algorithms**
```python
# Follow the base Slicer interface
from pysclice.slicers.base import Slicer

class NewSlicer(Slicer):
    def __init__(self, model_wrapper, **kwargs):
        super().__init__(model_wrapper)
        # Initialize your specific parameters
    
    def slice(self, center_point, **kwargs):
        # Implement your slicing logic
        # Return slice data in standard format
        pass
```

##### 2. **Code Style**
- Use type hints where possible
- Follow PEP 8 naming conventions
- Add docstrings to all public methods
- Use descriptive variable names

##### 3. **Testing**
- Add unit tests for new slicing algorithms
- Test with different model architectures
- Verify output format consistency

### TensorBoard Plugin Development

#### Architecture
```
tensorboard_plugin/tensorboard_loss_slicer/
├── plugin.py              # Backend Flask routes
├── summary_v2.py          # Logging interface
├── metadata.py            # Plugin metadata
├── frontend/              # React/TypeScript frontend
│   ├── src/
│   └── package.json
└── static/               # Built frontend assets
```

#### Backend Development

##### Plugin Structure
The plugin follows TensorBoard's plugin architecture:

```python
class LossSlicerPlugin(base_plugin.TBPlugin):
    def get_plugin_apps(self):
        # Define Flask routes for data access
        return {
            '/tags': self._serve_tags,
            '/slices': self._serve_slices,
        }
```

##### Adding New Endpoints
1. Add route handler to `plugin.py`
2. Update frontend API calls in `lib/api.ts`
3. Test with sample data

#### Frontend Development

##### Technology Stack
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components

##### Development Workflow
```bash
# Start development server
cd tensorboard_plugin/tensorboard_loss_slicer/frontend
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

##### Component Structure
```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── dashboards/            # Slicer-specific views
│   └── slicing-methods/       # Method-specific controls
├── contexts/                  # React contexts for state
├── hooks/                     # Custom React hooks
└── lib/                       # Utilities and API calls
```

##### Adding New Slicing Method UI
1. Create component in `components/slicing-methods/`
2. Add dashboard in `components/dashboards/`
3. Update method selector
4. Add API integration

##### State Management
- Use React Context for global state
- Local state for component-specific data
- Custom hooks for API integration

##### Styling Guidelines
- Use Tailwind utility classes
- Follow shadcn/ui design system
- Responsive design principles
- Dark mode support

## Development Best Practices

### Version Control

#### Commit Messages
```
feat: add random direction slicer
fix: correct axis parallel parameter validation
docs: update API documentation
refactor: simplify model wrapper interface
test: add integration tests for slicers
```

#### Branch Strategy
- **`main`**: Stable releases
- **`develop`**: Integration branch
- **`feature/slicer-name`**: New features
- **`fix/issue-description`**: Bug fixes

### Code Quality

#### Linting and Formatting
```bash
# Python code
flake8 pysclice/
black pysclice/
isort pysclice/

# TypeScript code
cd tensorboard_plugin/tensorboard_loss_slicer/frontend
npm run lint
npm run format
```

#### Type Checking
```bash
# Python
mypy pysclice/

# TypeScript
npm run type-check
```

### Testing Strategy

#### Unit Tests
```bash
# Run Python tests
python -m pytest tests/

# Run frontend tests
cd frontend && npm test
```

#### Integration Tests
- Test with real PyTorch models
- Verify TensorBoard plugin integration
- Cross-browser testing for frontend

#### Performance Tests
- Benchmark slicing algorithms
- Memory usage profiling
- Large model testing

### Documentation

#### Code Documentation
- **Docstrings**: All public APIs
- **Type hints**: Function signatures
- **Comments**: Complex algorithms only

#### User Documentation
- **Examples**: Jupyter notebooks
- **API reference**: Auto-generated from docstrings
- **Tutorials**: Step-by-step guides

### Release Process

#### Version Management
- Semantic versioning (MAJOR.MINOR.PATCH)
- Update `setup.py` and `package.json`
- Tag releases in git

#### Build and Distribution
```bash
# Build Python package
python setup.py sdist bdist_wheel

# Build TensorBoard plugin
cd tensorboard_plugin
python setup.py sdist bdist_wheel

# Build frontend assets
cd frontend && npm run build
```

## Debugging Guidelines

### Common Issues

#### TensorBoard Plugin Not Loading
1. Check plugin installation: `pip list | grep tensorboard-loss-slicer`
2. Verify frontend build: `ls tensorboard_plugin/tensorboard_loss_slicer/static/`
3. Check TensorBoard logs for errors

#### Frontend Development Issues
1. Clear node_modules and reinstall
2. Check for TypeScript errors
3. Verify API endpoint connectivity

#### Slicing Algorithm Issues
1. Validate input parameters
2. Check model wrapper compatibility
3. Verify output format

### Performance Optimization

#### Python Code
- Use vectorized operations with NumPy/PyTorch
- Profile with `cProfile` for bottlenecks
- Consider memory usage for large models

#### Frontend Code
- Use React.memo for expensive components
- Implement virtualization for large datasets
- Optimize bundle size with code splitting

## Contributing Guidelines

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Update documentation
5. Submit pull request

### Code Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass and coverage maintained
- [ ] Documentation updated
- [ ] No breaking changes (or properly documented)
- [ ] Performance impact considered

### Issue Reporting
- Use issue templates
- Provide minimal reproduction cases
- Include environment details
- Tag appropriately (bug, feature, docs)

## Resources

### Learning Materials
- [TensorBoard Plugin Development](https://github.com/tensorflow/tensorboard/tree/master/docs/plugin_development.md)
- [React TypeScript Best Practices](https://react-typescript-cheatsheet.netlify.app/)
- [PyTorch Documentation](https://pytorch.org/docs/)

### Tools
- **VSCode**: Recommended IDE with Python and TypeScript extensions
- **Jupyter**: For interactive development and examples
- **TensorBoard**: For testing plugin integration


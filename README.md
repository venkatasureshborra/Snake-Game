# 🐍 Snake Game - Cloud Native Deployment

A modern, web-based Snake game deployed on Kubernetes with production-grade CI/CD practices and GitOps workflow.

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![ArgoCD](https://img.shields.io/badge/argo-EF7B4D.svg?style=for-the-badge&logo=argo&logoColor=white)

## 📋 Table of Contents

- [Overview](overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [CI/CD Pipeline](#cicd-pipeline)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Monitoring & Observability](#monitoring--observability)
- [Security](#security)
- [Future Enhancements](#future-enhancements)

## Overview

This project demonstrates a complete DevOps workflow for deploying a simple web application (Snake Game) using modern cloud-native technologies. It showcases:

- **Containerization** with Docker
- **Continuous Integration** with GitHub Actions
- **Continuous Deployment** with ArgoCD (GitOps)
- **Container Registry** with GitHub Container Registry (GHCR)
- **Orchestration** with Kubernetes
- **Production-ready** configurations with security and high availability

## Architecture

```
┌─────────────────┐
│  Developer      │
│  Push Code      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│         GitHub Repository                   │
│  ┌──────────────────────────────────────┐  │
│  │     GitHub Actions (CI)               │  │
│  │  • Build Docker Image                 │  │
│  │  • Run Tests                          │  │
│  │  • Security Scan                      │  │
│  │  • Push to GHCR                       │  │
│  │  • Update Manifest Repo               │  │
│  └──────────────┬───────────────────────┘  │
└─────────────────┼───────────────────────────┘
                  │
                  ▼
         ┌─────────────────┐
         │      GHCR       │
         │ Container Image │
         └─────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│         Kubernetes Cluster                  │
│  ┌──────────────────────────────────────┐  │
│  │        ArgoCD (CD)                    │  │
│  │  • Monitors Git Repository            │  │
│  │  • Syncs Kubernetes Manifests         │  │
│  │  • Automated Deployment               │  │
│  │  • Rollback Capabilities              │  │
│  └──────────────┬───────────────────────┘  │
│                 │                           │
│                 ▼                           │
│  ┌──────────────────────────────────────┐  │
│  │     Snake Game Deployment            │  │
│  │  • 3 Replicas (HA)                   │  │
│  │  • Auto-scaling                      │  │
│  │  • Health Checks                     │  │
│  │  • Network Policies                  │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

## ✨ Features

### Application Features
- 🎮 Classic Snake game with smooth gameplay
- 📱 Responsive web design
- 🎨 Modern UI/UX
- ⚡ Fast and lightweight

### DevOps Features
- 🔄 Automated CI/CD pipeline
- 🐳 Multi-stage Docker builds for optimized images
- 🔐 Security scanning and vulnerability checks
- 📊 GitOps-based deployment with ArgoCD
- 🚀 Zero-downtime deployments
- 📈 Horizontal Pod Autoscaling
- 🛡️ Security best practices implemented
- 🔍 Health monitoring with probes
- 🌐 Ingress configuration for external access

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Served via static web server

### Infrastructure & DevOps
| Category | Technology |
|----------|-----------|
| **Containerization** | Docker |
| **Container Registry** | GitHub Container Registry (GHCR) |
| **CI Platform** | GitHub Actions |
| **CD Platform** | ArgoCD |
| **Orchestration** | Kubernetes |
| **Deployment Strategy** | GitOps |
| **Ingress Controller** | NGINX Ingress |
| **Monitoring** | Prometheus (ready) |

## 🔄 CI/CD Pipeline

### Continuous Integration (GitHub Actions)

The CI pipeline is triggered on every push to `main` branch and pull requests:

```yaml
Trigger: Push to main / PR
  ↓
Checkout Code
  ↓
Run Tests & Linting
  ↓
Security Scan (Trivy/Snyk)
  ↓
Build Docker Image
  ↓
Tag Image (commit SHA, latest)
  ↓
Push to GHCR
  ↓
Update K8s Manifest Repository
  ↓
Notify Team (optional)
```

**Key Steps:**
1. **Code Checkout**: Clone the repository
2. **Build**: Create optimized Docker image
3. **Test**: Run unit and integration tests
4. **Scan**: Security vulnerability scanning
5. **Push**: Upload image to GHCR
6. **Update**: Update image tag in manifest repository

### Continuous Deployment (ArgoCD)

ArgoCD implements GitOps methodology:

```yaml
ArgoCD Monitors Git Repository
  ↓
Detects Changes in K8s Manifests
  ↓
Compares Desired State vs Current State
  ↓
Applies Changes to Cluster
  ↓
Verifies Deployment Health
  ↓
Application Synced ✅
```

**Benefits:**
- 📖 Git as single source of truth
- 🔄 Automatic synchronization
- 🎯 Declarative deployments
- ⏮️ Easy rollback capabilities
- 👁️ Visual deployment status

## ☸️ Kubernetes Deployment

### Production-Ready Configuration

#### Deployment Specifications
```yaml
Replicas: 3 (High Availability)
Strategy: RollingUpdate
  - MaxSurge: 1
  - MaxUnavailable: 0
Resources:
  - CPU: 100m-200m
  - Memory: 64Mi-128Mi
```

#### Security Features
- ✅ Non-root user execution
- ✅ Read-only root filesystem
- ✅ Dropped all Linux capabilities
- ✅ Security context policies
- ✅ Network policies configured
- ✅ Pod Security Standards compliant

#### High Availability
- 🔄 3 minimum replicas
- 📍 Pod anti-affinity rules
- 🛡️ Pod Disruption Budget (PDB)
- 🔄 Rolling updates with zero downtime
- 📈 Horizontal Pod Autoscaler (HPA)

#### Health Monitoring
- ❤️ Liveness Probe: Checks if container is alive
- ✅ Readiness Probe: Checks if ready for traffic
- 🚀 Startup Probe: Handles slow container starts

#### Auto-scaling Configuration
```yaml
Min Replicas: 3
Max Replicas: 10
Metrics:
  - CPU: 70% threshold
  - Memory: 80% threshold
```

## 🚀 Getting Started

### Prerequisites
- Kubernetes cluster (v1.24+)
- kubectl configured
- ArgoCD installed on cluster
- GitHub account with GHCR access
- Domain name (optional, for Ingress)

### Installation Steps

#### 1. Fork and Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/snake-game.git
cd snake-game
```

#### 2. Configure GitHub Actions Secrets
Add these secrets to your GitHub repository:

```
GHCR_TOKEN          # GitHub Personal Access Token
KUBE_CONFIG         # Kubernetes config (if direct deploy)
ARGOCD_TOKEN        # ArgoCD auth token (optional)
```

#### 3. Deploy with ArgoCD

```bash
# Create ArgoCD Application
kubectl apply -f argocd/application.yaml

# Or via ArgoCD CLI
argocd app create snake-game \
  --repo https://github.com/YOUR_USERNAME/snake-game-manifests.git \
  --path kubernetes \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace snake-game \
  --sync-policy automated \
  --auto-prune \
  --self-heal
```

#### 4. Access the Application

```bash
# Get Ingress URL
kubectl get ingress -n snake-game

# Or via Port Forward (for testing)
kubectl port-forward svc/snake-game 8080:80 -n snake-game
# Access: http://localhost:8080
```

### Verify Deployment

```bash
# Check all resources
kubectl get all -n snake-game

# Check pod status
kubectl get pods -n snake-game

# Check HPA status
kubectl get hpa -n snake-game

# View logs
kubectl logs -f deployment/snake-game -n snake-game

# ArgoCD sync status
argocd app get snake-game
```

## 📁 Project Structure

```
snake-game/
├── .github/
│   └── workflows/
│       └── ci.yaml              # GitHub Actions CI pipeline
├── kubernetes/
│   ├── deployment.yaml          # K8s deployment manifest
│   ├── service.yaml             # K8s service
│   ├── ingress.yaml             # Ingress configuration
│   ├── hpa.yaml                 # Horizontal Pod Autoscaler
│   ├── pdb.yaml                 # Pod Disruption Budget
│   └── networkpolicy.yaml       # Network policies
├── argocd/
│   └── application.yaml         # ArgoCD application definition
├── src/
│   ├── index.html               # Game HTML
│   ├── style.css                # Styling
│   └── game.js                  # Game logic
├── Dockerfile                   # Multi-stage Docker build
├── .dockerignore               
├── README.md                    # This file
└── LICENSE
```

## 📊 Monitoring & Observability

### Metrics Collection
- Prometheus annotations configured
- Resource usage tracking
- Pod health status
- HPA metrics

### Logging
```bash
# Application logs
kubectl logs -f deployment/snake-game -n snake-game

# Previous pod logs
kubectl logs deployment/snake-game -n snake-game --previous

# All pods logs
kubectl logs -l app=snake-game -n snake-game --tail=100
```

### ArgoCD Dashboard
- Real-time deployment status
- Application health overview
- Sync status and history
- Rollback capabilities

Access ArgoCD UI:
```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
# Access: https://localhost:8080
```

## 🔐 Security

### Implemented Security Measures

1. **Container Security**
   - Non-root user execution
   - Read-only root filesystem
   - Minimal base image
   - No unnecessary privileges

2. **Network Security**
   - Network policies restricting traffic
   - TLS/SSL encryption via Ingress
   - Service mesh ready

3. **Kubernetes Security**
   - RBAC configured
   - Pod Security Standards
   - Security contexts enforced
   - Secrets management

4. **CI/CD Security**
   - Image scanning in pipeline
   - Signed commits (optional)
   - Secrets stored in GitHub Secrets
   - Least privilege access

### Security Scanning

```bash
# Scan Docker image
trivy image ghcr.io/YOUR_USERNAME/snake-game:latest

# Scan Kubernetes manifests
kubesec scan kubernetes/deployment.yaml
```

## 🔮 Future Enhancements

- [ ] Add Helm charts for easier deployment
- [ ] Implement service mesh (Istio/Linkerd)
- [ ] Add distributed tracing (Jaeger)
- [ ] Implement blue-green deployments
- [ ] Add E2E testing in pipeline
- [ ] Implement chaos engineering tests
- [ ] Add multi-cluster deployment
- [ ] Implement custom metrics for scaling
- [ ] Add progressive delivery with Argo Rollouts
- [ ] Implement cost optimization strategies

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Application port | `8080` |
| `NODE_ENV` | Environment | `production` |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [Venkata Suresh](https://github.com/venkatasureshborra)
- LinkedIn: [linkedin/venkatasureshborra](https://linkedin.com/in/venkatasureshborra)
- Portfolio: [venkatasuresh](https://venkatasuresh.netlify.app)

## 🙏 Acknowledgments

- Kubernetes community for excellent documentation
- ArgoCD team for GitOps implementation
- GitHub Actions for CI/CD platform
- Open source community

## 📞 Support

If you have any questions or issues, please:
- Open an issue in the repository
- Check existing issues and discussions
- Review the documentation

---

⭐ **Star this repo if you find it helpful!**

Made with ❤️ and ☸️

# SkyTravel - Scroll Animations Guide

This document explains how scroll animations are implemented in the SkyTravel project using Framer Motion.

## ✅ Status: Already Implemented!

Framer Motion is already installed and configured in your project. All major sections have smooth, professional scroll animations.

---

## 📦 Installation (Already Done)

```
json
// package.json - Already includes:
"framer-motion": "^12.23.26"
```

No additional installation needed!

---

## 🎬 Available Animations

### Animation Types (in `src/components/ScrollAnimation.jsx`):

| Variant | Description |
|---------|-------------|
| `fadeInUp` | Fade in + slide up (default, 40px distance) |
| `fadeInUpLong` | Fade in + slide up (60px distance for larger elements) |
| `zoomIn` | Fade in + scale up from 0.9 |
| `zoomOut` | Fade in + scale down from 1.1 |
| `slideInLeft` | Slide in from the left |
| `slideInRight` | Slide in from the right |
| `fadeIn` | Simple fade in (no movement) |
| `staggerContainer` | Container for staggered animations |
| `staggerFast` | Fast stagger (50ms between items) |
| `staggerItem` | Individual item for stagger animations |

---

## 🚀 How to Use

### Basic Usage:

```
jsx
import ScrollAnimation from "../components/ScrollAnimation";

// Wrap any element to animate on scroll
<ScrollAnimation variant="fadeInUp">
  <YourContent />
</ScrollAnimation>
```

### With Custom Settings:

```
jsx
<ScrollAnimation 
  variant="fadeInUp" 
  delay={0.2}        // Delay in seconds
  amount={0.3}      // Trigger when 30% visible
  once={true}       // Animate only once
  className="my-class"
>
  <YourContent />
</ScrollAnimation>
```

### For Lists/Cards (Staggered Animation):

```
jsx
import { ScrollAnimation, staggerContainer, staggerItem } from "../components/ScrollAnimation";

// Parent container
<ScrollAnimation variant="staggerContainer">
  {items.map(item => (
    // Each child
    <ScrollAnimation variant="staggerItem">
      <Card />
    </ScrollAnimation>
  ))}
</ScrollAnimation>
```

---

## 📱 Current Implementation Status

| Page | Status | Animation Type |
|------|--------|----------------|
| Home | ✅ Updated | fadeInUp with staggered delays |
| Destinations | ✅ Already | motion.div with stagger |
| Offers | ✅ Already | motion.div with AnimatePresence |
| Gallery | ✅ Already | Carousel + Modal animations |
| Testimonials | ✅ Already | Staggered card animations |
| Contact | ⚠️ Check | Needs verification |
| About | ⚠️ Check | Needs verification |

---

## 🎨 Animation Configuration

The default animation settings are:
- **Duration**: 0.6 seconds
- **Easing**: Cubic-bezier [0.25, 0.1, 0.25, 1] (smooth)
- **Trigger**: When 20% of element is visible
- **Repeat**: Animates only once (performance optimized)

---

## ✨ Adding Animations to New Sections

### Example - Adding to a section:

```
jsx
import ScrollAnimation from "../components/ScrollAnimation";

function MySection() {
  return (
    <section>
      {/* Title with slide from left */}
      <ScrollAnimation variant="slideInLeft">
        <h1>My Title</h1>
      </ScrollAnimation>
      
      {/* Cards with staggered animation */}
      <ScrollAnimation variant="staggerContainer">
        {cards.map(card => (
          <ScrollAnimation variant="staggerItem">
            <Card data={card} />
          </ScrollAnimation>
        ))}
      </ScrollAnimation>
    </section>
  );
}
```

### Example - Different delays for visual interest:

```
jsx
<ScrollAnimation variant="fadeInUp" delay={0.1}>
  <h1>Title</h1>
</ScrollAnimation>

<ScrollAnimation variant="fadeInUp" delay={0.2}>
  <p>Subtitle appears after title</p>
</ScrollAnimation>

<ScrollAnimation variant="fadeInUp" delay={0.3}>
  <button>Button appears last</button>
</ScrollAnimation>
```

---

## 🔧 Performance Tips

1. **Use `once={true}`** - Prevents re-animation when scrolling back up
2. **Adjust `amount`** - Use higher values (0.5) for earlier triggers, lower (0.1) for later
3. **Limit stagger items** - Don't stagger more than 10-12 items at once
4. **Use `fadeIn`** for text - Simpler = faster rendering

---

## 📂 File Structure

```
vite-project/
├── src/
│   ├── components/
│   │   ├── ScrollAnimation.jsx    ← Animation wrapper component
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx              ← Uses ScrollAnimation
│   │   ├── Destinations.jsx      ← Uses framer-motion directly
│   │   ├── Offers.jsx            ← Uses framer-motion directly
│   │   ├── Gallery.jsx           ← Uses framer-motion directly
│   │   ├── Testimonials.jsx      ← Uses framer-motion directly
│   │   └── ...
│   └── ...
└── package.json                   ← framer-motion installed
```

---

## 🎯 Quick Reference

Need a specific effect? Use these variants:

| Effect | Variant |
|--------|---------|
| Standard slide up | `fadeInUp` |
| Big entrance | `fadeInUpLong` |
| Zoom in | `zoomIn` |
| Zoom out | `zoomOut` |
| From left | `slideInLeft` |
| From right | `slideInRight` |
| Fade only | `fadeIn` |
| Card list | `staggerContainer` + `staggerItem` |

---

## ✅ Summary

Your SkyTravel project already has **professional scroll animations** implemented using Framer Motion:

- ✅ Framer Motion installed
- ✅ Reusable ScrollAnimation component created
- ✅ Home page updated with animations
- ✅ Destinations, Offers, Gallery, Testimonials already have animations
- ✅ Smooth fade-in + slide-up effects
- ✅ Animations trigger on scroll (once per element)
- ✅ Responsive and performant

The animations will automatically work when users scroll down the page!

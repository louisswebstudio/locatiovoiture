# Séquence de prompts, dans l'ordre de collage

**Règle du jeu**

- **Un nouveau chat par voiture.** Sinon le modèle mélange les carrosseries.
- **Un prompt par message**, dans l'ordre. Ne saute jamais une étape : les prompts B et C
  s'appuient sur l'image générée juste avant, c'est de là que vient la cohérence de
  couleur et de jantes.
- Si le rendu du message 1 ne te plaît pas, **corrige-le avant de passer au suivant**
  (« make the paint darker », « lower the camera a bit »). Un A raté = tout le set raté.
- Modèle : *Gemini 2.5 Flash Image* sur aistudio.google.com (gratuit).
- Si AI Studio refuse un `.webp`, ouvre-le et réenregistre-le en PNG.

Les prompts B et C sont identiques partout, c'est normal : ils ne décrivent qu'un
déplacement de caméra.

---

## 1. Opel Corsa  *(ref 20)*

> **Nouveau chat.** Sortie attendue : `cars/opel-corsa.png` · `34/opel-corsa.png` · `side view/opel-corsa.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/p208.webp` (le studio) **2)** une photo réelle de Opel Corsa (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a metallic white 2023 Opel Corsa F hatchback.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 2. Dacia Logan  *(ref 22)*

> **Nouveau chat.** Sortie attendue : `cars/dacia-logan.png` · `34/dacia-logan.png` · `side view/dacia-logan.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/sandero.webp` (le studio) **2)** une photo réelle de Dacia Logan (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a metallic grey 2023 Dacia Logan sedan, third generation.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 3. Hyundai Accent 2025  *(ref 24)*

> **Nouveau chat.** Sortie attendue : `cars/hyundai-accent.png` · `34/hyundai-accent.png` · `side view/hyundai-accent.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/skoda-octavia.webp` (le studio) **2)** une photo réelle de Hyundai Accent 2025 (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a pearl white 2025 Hyundai Accent sedan.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 4. Seat Leon FR  *(ref 27)*

> **Nouveau chat.** Sortie attendue : `cars/seat-leon.png` · `34/seat-leon.png` · `side view/seat-leon.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/clio5.webp` (le studio) **2)** une photo réelle de Seat Leon FR (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a desire red 2023 Seat Leon FR Mk4 hatchback.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 5. Cupra Leon 2025  *(ref 28)*

> **Nouveau chat.** Sortie attendue : `cars/cupra-leon.png` · `34/cupra-leon.png` · `side view/cupra-leon.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/clio5.webp` (le studio) **2)** une photo réelle de Cupra Leon 2025 (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a matte petrol blue 2025 Cupra Leon hatchback with copper accents.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 6. VW Golf 8.5 2026  *(ref 29)*

> **Nouveau chat.** Sortie attendue : `cars/vw-golf-85.png` · `34/vw-golf-85.png` · `side view/vw-golf-85.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/p208.webp` (le studio) **2)** une photo réelle de VW Golf 8.5 2026 (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a moonstone grey 2026 Volkswagen Golf 8.5 hatchback.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 7. Audi A3 2025  *(ref 30)*

> **Nouveau chat.** Sortie attendue : `cars/audi-a3.png` · `34/audi-a3.png` · `side view/audi-a3.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/clio5.webp` (le studio) **2)** une photo réelle de Audi A3 2025 (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a daytona grey 2025 Audi A3 Sportback S line.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 8. Mercedes Classe A  *(ref 31)*

> **Nouveau chat.** Sortie attendue : `cars/mercedes-classe-a.png` · `34/mercedes-classe-a.png` · `side view/mercedes-classe-a.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/p208.webp` (le studio) **2)** une photo réelle de Mercedes Classe A (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a polar white 2023 Mercedes-Benz A-Class hatchback AMG Line.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 9. BMW Serie 1 2026  *(ref 32)*

> **Nouveau chat.** Sortie attendue : `cars/bmw-serie-1.png` · `34/bmw-serie-1.png` · `side view/bmw-serie-1.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/clio5.webp` (le studio) **2)** une photo réelle de BMW Serie 1 2026 (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a black sapphire 2026 BMW 1 Series F70 M Sport.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 10. Hyundai Tucson  *(ref 33)*

> **Nouveau chat.** Sortie attendue : `cars/hyundai-tucson.png` · `34/hyundai-tucson.png` · `side view/hyundai-tucson.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/troc.png` (le studio) **2)** une photo réelle de Hyundai Tucson (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a amazon grey 2024 Hyundai Tucson SUV.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 11. VW Tiguan 2025  *(ref 36)*

> **Nouveau chat.** Sortie attendue : `cars/vw-tiguan.png` · `34/vw-tiguan.png` · `side view/vw-tiguan.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/troc.png` (le studio) **2)** une photo réelle de VW Tiguan 2025 (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a oyster silver 2025 Volkswagen Tiguan Mk3 SUV.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 12. Audi Q3 2026  *(ref 37)*

> **Nouveau chat.** Sortie attendue : `cars/audi-q3.png` · `34/audi-q3.png` · `side view/audi-q3.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/troc.png` (le studio) **2)** une photo réelle de Audi Q3 2026 (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a navarra blue 2026 Audi Q3 SUV S line.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 13. Audi RS3 2026  *(ref 39)*

> **Nouveau chat.** Sortie attendue : `cars/audi-rs3.png` · `34/audi-rs3.png` · `side view/audi-rs3.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/clio5.webp` (le studio) **2)** une photo réelle de Audi RS3 2026 (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a nardo grey 2026 Audi RS3 Sportback.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 14. Porsche Macan  *(ref 40)*

> **Nouveau chat.** Sortie attendue : `cars/porsche-macan.png` · `34/porsche-macan.png` · `side view/porsche-macan.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/kia-sportage.png` (le studio) **2)** une photo réelle de Porsche Macan (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a jet black metallic 2024 Porsche Macan SUV.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 15. Range Rover Sport 2025  *(ref 41)*

> **Nouveau chat.** Sortie attendue : `cars/range-rover-sport.png` · `34/range-rover-sport.png` · `side view/range-rover-sport.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/kia-sportage.png` (le studio) **2)** une photo réelle de Range Rover Sport 2025 (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a santorini black 2025 Range Rover Sport SUV.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 16. VW Touareg 2025  *(ref 42)*

> **Nouveau chat.** Sortie attendue : `cars/vw-touareg.png` · `34/vw-touareg.png` · `side view/vw-touareg.png`

### Message 1 - 3/4 avant

Joindre **2 images** : **1)** `assets/images/cars/kia-sportage.png` (le studio) **2)** une photo réelle de VW Touareg 2025 (la carrosserie).

```
Using the first image as the exact studio, lighting and framing reference, and the second image as the exact vehicle reference, generate a manufacturer-configurator studio render of a chiffon grey 2025 Volkswagen Touareg SUV.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - 3/4 arrière

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 3 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

# Voitures qui ont déjà leur 3/4 avant

On saute le message 1 : on joint directement l'image existante avec le prompt B.

---

## 17. Hyundai i10  *(ref 21)*

> **Nouveau chat.** Sortie attendue : `34/i10.png` · `side view/i10.png`

### Message 1 - 3/4 arrière

Joindre **1 image** : `assets/images/cars/i10.webp`.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 18. Seat Ibiza FR  *(ref 26)*

> **Nouveau chat.** Sortie attendue : `34/seat-ibiza.png` · `side view/seat-ibiza.png`

### Message 1 - 3/4 arrière

Joindre **1 image** : `assets/images/cars/seat-ibiza.webp`.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 19. Dacia Duster  *(ref 34/35)*

> **Nouveau chat.** Sortie attendue : `34/duster.png` · `side view/duster.png`

### Message 1 - 3/4 arrière

Joindre **1 image** : `assets/images/cars/duster.webp`.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 20. Cupra Formentor 2025  *(ref 38)*

> **Nouveau chat.** Sortie attendue : `34/cupra-formentor.png` · `side view/cupra-formentor.png`

### Message 1 - 3/4 arrière

Joindre **1 image** : `assets/images/cars/cupra-formentor.webp`.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 21. VW Golf 8R  *(ref -)*

> **Nouveau chat.** Sortie attendue : `34/golf-8r.png` · `side view/golf-8r.png`

### Message 1 - 3/4 arrière

Joindre **1 image** : `assets/images/cars/GOLF8R.webp`.

```
Same car, same colour, same wheels and same studio as the previous image - only the camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor, visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### Message 2 - profil

Rien à joindre.

```
Same car, same colour, same wheels and same studio as the previous images - only the camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at door-handle height, absolutely no perspective distortion - both wheels identical in size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15% headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

**Total : 21 voitures, 58 images à générer.**

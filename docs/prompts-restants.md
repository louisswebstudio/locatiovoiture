# Prompts restants : photos à générer avec Nano Banana
Tout ce qu'il reste à produire pour que chaque voiture ait ses 3 angles (3/4 avant, 3/4 arrière, profil). **23 images au total.**
## Avant de commencer
1. Ouvre **aistudio.google.com**, modèle *Gemini 2.5 Flash Image* (Nano Banana), gratuit.
2. **Un nouveau chat par voiture.** Sinon le modèle mélange les carrosseries.
3. **Un prompt par message**, dans l'ordre indiqué.
4. Les images à joindre sont indiquées avant chaque prompt. Celles qui commencent par `cars/`, `34/` ou `side view/` sont dans `assets/images/` du projet.
5. La « photo réelle » demandée pour certaines voitures : une photo officielle du modèle (site du constructeur ou article d'essai), prise **sous le même angle** que la vue à générer.
6. Si un résultat ne va pas, corrige-le dans le même chat avant de passer au suivant (« make the paint darker », « the wheels must match the first image »...).
7. Télécharge chaque image et **renomme-la exactement** comme indiqué (ex. `audi-q3-avant.png`). Mets-les toutes dans un dossier `assets/images/a-integrer/` et préviens-moi : je les convertis et je les branche sur le site.
### Deux studios sur le site
| Studio | Voitures concernées |
|---|---|
| **Crème** (plateau tournant, le plus récent) | Q3, Touareg, i10, Formentor, Accent, Tucson, Tiguan, Range Rover |
| **Blanc** (studio d'origine) | Ibiza, Duster, parce que leur photo avant existante est dans ce studio |

---
# Partie A : série complète (3 images par voiture)
Pour la i10 et le Formentor, la photo actuelle ne suit pas le style du site (fond noir détouré, basse résolution, ancien modèle ou plaque d'un loueur). On refait les trois angles.
## 1. Audi Q3 2026  *(réf. 37)*
> Aucune photo pour l'instant.  
> **Nouveau chat.** Couleur proposée : Navarra blue metallic (change-la si l'agence a une autre teinte).
### Message 1 : 3/4 avant  →  `audi-q3-avant.png`
Joindre : **1)** `cars/porsche-macan.webp`  **2)** une photo réelle du modèle Audi Q3 2026, vue de 3/4 avant.
```
Using the first image only as the reference for studio, lighting and framing, and the second image as the exact reference for the vehicle design, create a car-dealer studio photo of a Navarra blue metallic 2026 Audi Q3 S line SUV (third generation).

Camera: front three-quarter view from the front-left corner, camera at side-mirror height, perfectly level, no wide-angle distortion.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 2 : 3/4 arrière  →  `audi-q3-arriere.png`
Joindre : **1)** `34/porsche-macan.webp`
```
Same car as the previous image: identical paint colour, wheels, trim and studio. Only the camera moves. The first image shows the framing to copy.

Camera: rear three-quarter view from the rear corner, same camera height and distance as the reference, perfectly level, no wide-angle distortion. Rear lights visible and softly lit.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 3 : profil  →  `audi-q3-profil.png`
Joindre : **1)** `side view/porsche-macan.webp`
```
Same car as the previous image: identical paint colour, wheels, trim and studio. Only the camera moves. The first image shows the framing to copy.

Camera: perfect 90-degree side profile, front of the car pointing to the LEFT of the frame, camera at door-handle height, no perspective distortion: both wheels the same size.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
---
## 2. Volkswagen Touareg 2025  *(réf. 42)*
> Aucune photo pour l'instant.  
> **Nouveau chat.** Couleur proposée : pure white (change-la si l'agence a une autre teinte).
### Message 1 : 3/4 avant  →  `vw-touareg-avant.png`
Joindre : **1)** `cars/porsche-macan.webp`  **2)** une photo réelle du modèle Volkswagen Touareg 2025, vue de 3/4 avant.
```
Using the first image only as the reference for studio, lighting and framing, and the second image as the exact reference for the vehicle design, create a car-dealer studio photo of a pure white 2025 Volkswagen Touareg SUV (facelift with illuminated light bar).

Camera: front three-quarter view from the front-left corner, camera at side-mirror height, perfectly level, no wide-angle distortion.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 2 : 3/4 arrière  →  `vw-touareg-arriere.png`
Joindre : **1)** `34/porsche-macan.webp`
```
Same car as the previous image: identical paint colour, wheels, trim and studio. Only the camera moves. The first image shows the framing to copy.

Camera: rear three-quarter view from the rear corner, same camera height and distance as the reference, perfectly level, no wide-angle distortion. Rear lights visible and softly lit.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 3 : profil  →  `vw-touareg-profil.png`
Joindre : **1)** `side view/porsche-macan.webp`
```
Same car as the previous image: identical paint colour, wheels, trim and studio. Only the camera moves. The first image shows the framing to copy.

Camera: perfect 90-degree side profile, front of the car pointing to the LEFT of the frame, camera at door-handle height, no perspective distortion: both wheels the same size.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
---
## 3. Hyundai i10  *(réf. 21)*
> Remplace la photo actuelle. Si la i10 de l'agence est l'ancienne génération, écris « second generation » à la place.  
> **Nouveau chat.** Couleur proposée : sleek silver metallic (change-la si l'agence a une autre teinte).
### Message 1 : 3/4 avant  →  `i10-avant.png`
Joindre : **1)** `cars/opel-corsa.webp`  **2)** une photo réelle du modèle Hyundai i10, vue de 3/4 avant.
```
Using the first image only as the reference for studio, lighting and framing, and the second image as the exact reference for the vehicle design, create a car-dealer studio photo of a sleek silver metallic 2024 Hyundai i10 city car (third generation, facelift).

Camera: front three-quarter view from the front-left corner, camera at side-mirror height, perfectly level, no wide-angle distortion.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 2 : 3/4 arrière  →  `i10-arriere.png`
Joindre : **1)** `34/opel-corsa.webp`
```
Same car as the previous image: identical paint colour, wheels, trim and studio. Only the camera moves. The first image shows the framing to copy.

Camera: rear three-quarter view from the rear corner, same camera height and distance as the reference, perfectly level, no wide-angle distortion. Rear lights visible and softly lit.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 3 : profil  →  `i10-profil.png`
Joindre : **1)** `side view/opel-corsa.webp`
```
Same car as the previous image: identical paint colour, wheels, trim and studio. Only the camera moves. The first image shows the framing to copy.

Camera: perfect 90-degree side profile, front of the car pointing to the LEFT of the frame, camera at door-handle height, no perspective distortion: both wheels the same size.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
---
## 4. Cupra Formentor 2025  *(réf. 38)*
> Remplace la photo actuelle (400 px, fond noir, plaque « ayvens »).  
> **Nouveau chat.** Couleur proposée : dark midnight blue metallic (change-la si l'agence a une autre teinte).
### Message 1 : 3/4 avant  →  `cupra-formentor-avant.png`
Joindre : **1)** `cars/porsche-macan.webp`  **2)** une photo réelle du modèle Cupra Formentor 2025, vue de 3/4 avant.
```
Using the first image only as the reference for studio, lighting and framing, and the second image as the exact reference for the vehicle design, create a car-dealer studio photo of a dark midnight blue metallic 2025 Cupra Formentor (facelift with triangular headlights).

Camera: front three-quarter view from the front-left corner, camera at side-mirror height, perfectly level, no wide-angle distortion.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 2 : 3/4 arrière  →  `cupra-formentor-arriere.png`
Joindre : **1)** `34/porsche-macan.webp`
```
Same car as the previous image: identical paint colour, wheels, trim and studio. Only the camera moves. The first image shows the framing to copy.

Camera: rear three-quarter view from the rear corner, same camera height and distance as the reference, perfectly level, no wide-angle distortion. Rear lights visible and softly lit.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 3 : profil  →  `cupra-formentor-profil.png`
Joindre : **1)** `side view/porsche-macan.webp`
```
Same car as the previous image: identical paint colour, wheels, trim and studio. Only the camera moves. The first image shows the framing to copy.

Camera: perfect 90-degree side profile, front of the car pointing to the LEFT of the frame, camera at door-handle height, no perspective distortion: both wheels the same size.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
---
# Partie B : compléter une voiture qui a déjà une photo
Ici on part de la **photo existante de la voiture** (image 1), pour garder exactement la même couleur, les mêmes jantes et le même studio.
## 5. Hyundai Accent 2025  *(réf. 24)*
> Photo réelle **indispensable** : le dossier fourni contenait l'arrière d'une Elantra, le modèle a tendance à la reproduire. Cherche « 2025 Hyundai Accent rear » ou « Hyundai Verna rear ».  
> **Nouveau chat.** Il manque : 3/4 arrière, profil.
### Message 1 : 3/4 arrière  →  `hyundai-accent-arriere.png`
Joindre : **1)** `cars/hyundai-accent.webp` (sa photo existante)  **2)** `34/dacia-logan.webp` (cadrage)  **3)** une photo réelle du modèle Hyundai Accent 2025, vue de 3/4 arrière
```
The first image is a studio photo of this exact car, a 2025 Hyundai Accent sedan (called Verna in some markets), pearl white. Show the SAME car, with identical paint colour, wheels, trim and studio, seen from a different angle. The second image only shows the framing and camera position to copy. The third image is a real photo of this model: copy its rear design exactly. This is a Hyundai Accent, NOT a Hyundai Elantra: never use the Elantra rear or its lettering.

Camera: rear three-quarter view from the rear corner, same camera height and distance as the reference, perfectly level, no wide-angle distortion. Rear lights visible and softly lit.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 2 : profil  →  `hyundai-accent-profil.png`
Joindre : **1)** `cars/hyundai-accent.webp` (sa photo existante)  **2)** `side view/dacia-logan.webp` (cadrage)
```
The first image is a studio photo of this exact car, a 2025 Hyundai Accent sedan (called Verna in some markets), pearl white. Show the SAME car, with identical paint colour, wheels, trim and studio, seen from a different angle. The second image only shows the framing and camera position to copy.

Camera: perfect 90-degree side profile, front of the car pointing to the LEFT of the frame, camera at door-handle height, no perspective distortion: both wheels the same size.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
---
## 6. Hyundai Tucson  *(réf. 33)*
> Photo réelle conseillée pour l'arrière (la génération doit correspondre à la vue avant).  
> **Nouveau chat.** Il manque : 3/4 arrière, profil.
### Message 1 : 3/4 arrière  →  `hyundai-tucson-arriere.png`
Joindre : **1)** `cars/hyundai-tucson.webp` (sa photo existante)  **2)** `34/porsche-macan.webp` (cadrage)  **3)** une photo réelle du modèle Hyundai Tucson, vue de 3/4 arrière
```
The first image is a studio photo of this exact car, a Hyundai Tucson SUV (fourth generation), dark grey metallic. Show the SAME car, with identical paint colour, wheels, trim and studio, seen from a different angle. The second image only shows the framing and camera position to copy. The third image is a real photo of this model: copy its rear design exactly. Keep the same generation as the first image.

Camera: rear three-quarter view from the rear corner, same camera height and distance as the reference, perfectly level, no wide-angle distortion. Rear lights visible and softly lit.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 2 : profil  →  `hyundai-tucson-profil.png`
Joindre : **1)** `cars/hyundai-tucson.webp` (sa photo existante)  **2)** `side view/porsche-macan.webp` (cadrage)
```
The first image is a studio photo of this exact car, a Hyundai Tucson SUV (fourth generation), dark grey metallic. Show the SAME car, with identical paint colour, wheels, trim and studio, seen from a different angle. The second image only shows the framing and camera position to copy.

Camera: perfect 90-degree side profile, front of the car pointing to the LEFT of the frame, camera at door-handle height, no perspective distortion: both wheels the same size.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
---
## 7. Volkswagen Tiguan 2025  *(réf. 36)*
> Photo réelle **indispensable** pour l'avant : on ne dispose que de la vue arrière, et les photos fournies montraient l'ancien Tiguan. Cherche « 2025 VW Tiguan front ».  
> **Nouveau chat.** Il manque : 3/4 avant, profil.
### Message 1 : 3/4 avant  →  `vw-tiguan-avant.png`
Joindre : **1)** `34/vw-tiguan.webp` (sa photo existante)  **2)** `cars/porsche-macan.webp` (cadrage)  **3)** une photo réelle du modèle Volkswagen Tiguan 2025, vue de 3/4 avant
```
The first image is a studio photo of this exact car, a 2025 Volkswagen Tiguan SUV (third generation), warm grey metallic. Show the SAME car, with identical paint colour, wheels, trim and studio, seen from a different angle. The second image only shows the framing and camera position to copy. The third image is a real photo of this model: copy its front design exactly. This is the NEW third-generation Tiguan (2024 onwards), with a slim full-width front light bar, NOT the previous generation.

Camera: front three-quarter view from the front-left corner, camera at side-mirror height, perfectly level, no wide-angle distortion.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 2 : profil  →  `vw-tiguan-profil.png`
Joindre : **1)** `34/vw-tiguan.webp` (sa photo existante)  **2)** `side view/porsche-macan.webp` (cadrage)
```
The first image is a studio photo of this exact car, a 2025 Volkswagen Tiguan SUV (third generation), warm grey metallic. Show the SAME car, with identical paint colour, wheels, trim and studio, seen from a different angle. The second image only shows the framing and camera position to copy.

Camera: perfect 90-degree side profile, front of the car pointing to the LEFT of the frame, camera at door-handle height, no perspective distortion: both wheels the same size.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
---
## 8. Range Rover Sport 2025  *(réf. 41)*
> Il ne manque que le profil. Photo réelle facultative.  
> **Nouveau chat.** Il manque : profil.
### Message 1 : profil  →  `range-rover-sport-profil.png`
Joindre : **1)** `cars/range-rover-sport.webp` (sa photo existante)  **2)** `side view/porsche-macan.webp` (cadrage)
```
The first image is a studio photo of this exact car, a 2025 Range Rover Sport SUV, black. Show the SAME car, with identical paint colour, wheels, trim and studio, seen from a different angle. The second image only shows the framing and camera position to copy.

Camera: perfect 90-degree side profile, front of the car pointing to the LEFT of the frame, camera at door-handle height, no perspective distortion: both wheels the same size.
Set: the exact studio of the reference photo: seamless warm off-white walls curving into the floor, light warm-grey glossy floor with a large circular turntable disc visible under the car, a wide rectangular ceiling light panel just touching the top edge of the frame.
Lighting: soft, even, diffused daylight from above, no hard shadows, gentle reflections of the car on the glossy floor.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
---
## 9. Seat Ibiza FR  *(réf. 26)*
> Studio **blanc**, comme sa photo avant.  
> **Nouveau chat.** Il manque : 3/4 arrière, profil.
### Message 1 : 3/4 arrière  →  `seat-ibiza-arriere.png`
Joindre : **1)** `cars/seat-ibiza.webp` (sa photo existante)  **2)** `34/208.webp` (cadrage)
```
The first image is a studio photo of this exact car, a Seat Ibiza FR hatchback (2022 facelift), dark blue metallic. Show the SAME car, with identical paint colour, wheels, trim and studio, seen from a different angle. The second image only shows the framing and camera position to copy.

Camera: rear three-quarter view from the rear corner, same camera height and distance as the reference, perfectly level, no wide-angle distortion. Rear lights visible and softly lit.
Set: the exact studio of the reference photo: seamless pure white cyclorama, off-white back wall, very light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above, no hard shadows, long soft highlights along the bodywork.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 2 : profil  →  `seat-ibiza-profil.png`
Joindre : **1)** `cars/seat-ibiza.webp` (sa photo existante)  **2)** `side view/208.webp` (cadrage)
```
The first image is a studio photo of this exact car, a Seat Ibiza FR hatchback (2022 facelift), dark blue metallic. Show the SAME car, with identical paint colour, wheels, trim and studio, seen from a different angle. The second image only shows the framing and camera position to copy.

Camera: perfect 90-degree side profile, front of the car pointing to the LEFT of the frame, camera at door-handle height, no perspective distortion: both wheels the same size.
Set: the exact studio of the reference photo: seamless pure white cyclorama, off-white back wall, very light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above, no hard shadows, long soft highlights along the bodywork.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
---
## 10. Dacia Duster  *(réf. 34 / 35)*
> Studio **blanc**, comme sa photo avant. Le Duster automatique (réf. 35) utilisera les mêmes images.  
> **Nouveau chat.** Il manque : 3/4 arrière, profil.
### Message 1 : 3/4 arrière  →  `duster-arriere.png`
Joindre : **1)** `cars/duster.webp` (sa photo existante)  **2)** `34/troc.webp` (cadrage)  **3)** une photo réelle du modèle Dacia Duster, vue de 3/4 arrière
```
The first image is a studio photo of this exact car, a 2025 Dacia Duster SUV (third generation), sand beige. Show the SAME car, with identical paint colour, wheels, trim and studio, seen from a different angle. The second image only shows the framing and camera position to copy. The third image is a real photo of this model: copy its rear design exactly. Keep the same generation as the first image.

Camera: rear three-quarter view from the rear corner, same camera height and distance as the reference, perfectly level, no wide-angle distortion. Rear lights visible and softly lit.
Set: the exact studio of the reference photo: seamless pure white cyclorama, off-white back wall, very light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above, no hard shadows, long soft highlights along the bodywork.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
### Message 2 : profil  →  `duster-profil.png`
Joindre : **1)** `cars/duster.webp` (sa photo existante)  **2)** `side view/troc.webp` (cadrage)
```
The first image is a studio photo of this exact car, a 2025 Dacia Duster SUV (third generation), sand beige. Show the SAME car, with identical paint colour, wheels, trim and studio, seen from a different angle. The second image only shows the framing and camera position to copy.

Camera: perfect 90-degree side profile, front of the car pointing to the LEFT of the frame, camera at door-handle height, no perspective distortion: both wheels the same size.
Set: the exact studio of the reference photo: seamless pure white cyclorama, off-white back wall, very light grey floor, soft visible horizon line behind the car.
Lighting: large diffused softbox from above, no hard shadows, long soft highlights along the bodywork.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, the whole vehicle in frame, equal space left and right, about 10% empty space above the roof, 16:9 landscape.
Details: wheels pointing straight ahead, doors closed, lightly tinted windows, blank white licence plate with no text.
Do not include: people, text, watermarks, logos other than the car brand, outdoor scenery, extra cars, motion blur.
Photorealistic, ultra sharp, 1920x1080.
```
---
# Récapitulatif
| # | Voiture | Images | Fichiers à me renvoyer |
|---|---|---|---|
| 1 | Audi Q3 2026 | 3 | `audi-q3-avant / -arriere / -profil` |
| 2 | Volkswagen Touareg 2025 | 3 | `vw-touareg-avant / -arriere / -profil` |
| 3 | Hyundai i10 | 3 | `i10-avant / -arriere / -profil` |
| 4 | Cupra Formentor 2025 | 3 | `cupra-formentor-avant / -arriere / -profil` |
| 5 | Hyundai Accent 2025 | 2 | `hyundai-accent-arriere / hyundai-accent-profil` |
| 6 | Hyundai Tucson | 2 | `hyundai-tucson-arriere / hyundai-tucson-profil` |
| 7 | Volkswagen Tiguan 2025 | 2 | `vw-tiguan-avant / vw-tiguan-profil` |
| 8 | Range Rover Sport 2025 | 1 | `range-rover-sport-profil` |
| 9 | Seat Ibiza FR | 2 | `seat-ibiza-arriere / seat-ibiza-profil` |
| 10 | Dacia Duster | 2 | `duster-arriere / duster-profil` |

**Total : 23 images.**

from PIL import Image
import sys

def crop_logo():
    original_path = '/home/roy-gitahi/.gemini/antigravity/brain/89df3663-8d22-418d-b686-f28b7a435526/.user_uploaded/media__1788432572913.png'
    dest_path = '/home/roy-gitahi/capstone/frontend/public/favicon.png'
    
    img = Image.open(original_path).convert("RGBA")
    
    # We will just manually crop a 500x500 square from the top center, which contains the logo.
    # The image is 1024 x 1024 (or 1024 x 576, depending on how it was saved).
    width, height = img.size
    
    crop_size = 500
    
    left = (width - crop_size) // 2
    top = 50  # Start a bit below the top edge
    right = left + crop_size
    bottom = top + crop_size
    
    # Ensure we don't go out of bounds
    bottom = min(bottom, height)
    
    logo = img.crop((left, top, right, bottom))
    
    # Resize to 256x256 for a good favicon size
    logo = logo.resize((256, 256), Image.Resampling.LANCZOS)
    
    logo.save(dest_path)
    print(f"Manually cropped from {(left, top, right, bottom)} and saved to {dest_path}")
        
if __name__ == '__main__':
    crop_logo()

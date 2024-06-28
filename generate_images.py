from PIL import Image, ImageDraw, ImageFont
import os 

# generate_images.py
# This is a script to read all .txt files in jokes folder and create images dynamically

def wrap_text(text, width):
    words = text.split(' ')
    new_text = ''
    count = 0
    for word in words:
        if count != 0:
            new_text += ' '
            count += 1

        if '\n' in word:
            count = 0
        elif count + len(word) > width:
            new_text += '\n'
            count = 0

        count += len(word)    
        new_text += word


    return new_text


def create_image_with_text(text, image_path, bg_color=(0, 0, 0), text_color=(255, 255, 255)):
    # Calculate image height
    font_height = 32
    font_size = 20
    image_width = 740
    max_width = 75
    text_wrapped = wrap_text(text, width=max_width)
    lines = text_wrapped.split('\n')
    image_height = font_height * (len(lines) + 2)
    
    # Create image
    font_path='./CircularXX-Medium.woff'
    img = Image.new('RGB', (image_width, image_height), color=bg_color)
    font = ImageFont.truetype(font_path, font_size, encoding="UTF-8")
    draw = ImageDraw.Draw(img)

    y_pos = 32
    x_pos = 20

    for line in lines:
        draw.text((x_pos, y_pos), line, font=font, fill=text_color)
        y_pos += font_height

    img.save(image_path)
    print(f"Generated image: {image_path}")


def generate():
    for filename in os.listdir('./jokes'):
        if filename.endswith('.txt'):
            with open(os.path.join('./jokes', filename), 'r') as f:
                text = f.read()
            create_image_with_text(text, f'./jokes/{filename.replace(".txt",".png")}')

generate()

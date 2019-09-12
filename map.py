import os
import folium

# base direction
BASE_DIR = os.path.dirname((os.path.abspath(__file__)))

# cities i was in
cities = {
    'miandoab': (36.9661412, 46.1061001),
    'tabriz': (38.0803683, 46.293726),
    'tehran': (35.6968141, 51.3498186),
    'mashhad': (36.2975402, 59.4393717)
}

# base map location
base_location = (36.4223704, 54.4009081)

# icons
url = 'https://raw.githubusercontent.com/adamvizly/adamvizly.github.io/master/icons/{}'.format
heart = url('heart.png')
university = url('university.png')
home = url('home.png')
python = url('python.png')

# the map
resume_map = folium.Map(location=base_location,
                        zoom_start=6,
                        tiles="Cartodb Positron")

# markers
folium.Marker(location=cities['miandoab'],
              fill=True,
              icon=folium.features.CustomIcon(icon_image=home, icon_size=(20, 20)),
              popup=folium.Popup('This is Miandoab, my HomeTown', parse_html=True, max_width=100)).add_to(resume_map)
folium.Marker(location=cities['tabriz'],
              fill=True,
              icon=folium.features.CustomIcon(icon_image=university, icon_size=(20, 20)),
              popup=folium.Popup('Here I studied CS for BS degree', parse_html=True, max_width=100)).add_to(resume_map)
folium.Marker(location=cities['tehran'],
              fill=True,
              icon=folium.features.CustomIcon(icon_image=python, icon_size=(20, 20)),
              popup=folium.Popup('I am currently here working as a Python Developer',
                                 parse_html=True, max_width=100)
              ).add_to(resume_map)
folium.Marker(location=cities['mashhad'],
              fill=True,
              icon=folium.features.CustomIcon(icon_image=heart, icon_size=(20, 20)),
              popup=folium.Popup('Where I fall in love with my Beautiful fiancé',
                                 parse_html=True, max_width=100)
              ).add_to(resume_map)

resume_map.save(os.path.join(BASE_DIR, 'index.html'))

import urllib.request
import zipfile
import io

kml_url = "https://www.google.com/maps/d/kml?mid=1yyWU7jFW3L7DVjDgZlFuHDTrtCY&forcekml=1"
req = urllib.request.Request(kml_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req)
    data = response.read()
    print("Downloaded size:", len(data))
    if data.startswith(b'PK'):
        print("It's a KMZ (ZIP).")
        with zipfile.ZipFile(io.BytesIO(data)) as z:
            print("Files in ZIP:", z.namelist())
            kml_data = z.read('doc.kml')
            print("KML length:", len(kml_data))
    else:
        print("It's a KML.")
        kml_data = data
        print("KML length:", len(kml_data))
        
    # Write a snippet to inspect
    print(kml_data[:500].decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)

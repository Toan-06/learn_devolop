import urllib.request
import os

signs = [
    "P101", "P102", "P103a", "P103b", "P103c", "P104", "P105", "P106a", "P106b", "P106c",
    "P107", "P107a", "P107b", "P108", "P108a", "P109", "P110a", "P110b", "P111a", "P111b",
    "P111c", "P111d", "P112", "P113", "P114", "P115", "P116", "P117", "P118", "P119",
    "P120", "P121", "P122", "P123a", "P123b", "P124a1", "P124a2", "P124b1", "P124b2", "P124c",
    "P124d", "P124e", "P127a", "P127b", "P131", "P132", "P133", "P134",
    "W201", "W202", "W203", "W204", "W205", "W206", "W207", "W208", "W209", "W210",
    "W219", "W221", "W222", "W223", "W224", "W225", "W226", "W227", "W228", "W229",
    "W230", "W231", "W232", "W233", "W234", "W235", "W236", "W237", "W238", "W239",
    "W240", "W241", "W242", "W243", "W244", "W245", "W246", "W247", "W248",
    "R301", "R302", "R303", "R304", "R305", "R306", "R307", "R401", "R402", "R403"
]

base_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/"

os.makedirs("d:/quizz/assets/signs", exist_ok=True)

for sign in signs:
    # Try SVG first
    url = f"{base_url}3/3f/Vietnam_road_sign_{sign}.svg/800px-Vietnam_road_sign_{sign}.svg.png"
    filename = f"d:/quizz/assets/signs/{sign}.png"
    
    if not os.path.exists(filename):
        try:
            urllib.request.urlretrieve(url, filename)
            print(f"Downloaded: {sign}")
        except:
            # Try alternative path for warning signs
            alt_url = f"{base_url}5/5d/Vietnam_road_sign_{sign}.svg/800px-Vietnam_road_sign_{sign}.svg.png"
            try:
                urllib.request.urlretrieve(alt_url, filename)
                print(f"Downloaded: {sign} (alt)")
            except Exception as e:
                print(f"Failed: {sign} - {e}")
    else:
        print(f"Skipped: {sign} (exists)")

print("Done!")

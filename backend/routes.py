from flask import Blueprint, request, jsonify
from app import db  # Import the 'db' object from app.py

api = Blueprint('api', __name__)

# Route to create a new overlay
@api.route("/overlays", methods=["POST"])
def create_overlay():
    data = request.get_json()
    overlay = {
        "content": data.get("content"),
        "position": data.get("position"),
        "size": data.get("size")
    }
    result = db['overlays'].insert_one(overlay)
    return jsonify({"message": "Overlay created", "id": str(result.inserted_id)}), 201

# Route to read all overlays
@api.route("/overlays", methods=["GET"])
def get_overlays():
    overlays = db['overlays'].find()
    overlay_list = []
    for overlay in overlays:
        overlay["_id"] = str(overlay["_id"])  # Convert ObjectId to string
        overlay_list.append(overlay)
    return jsonify(overlay_list), 200

# Route to read a specific overlay by ID
@api.route("/overlays/<overlay_id>", methods=["GET"])
def get_overlay(overlay_id):
    overlay = db['overlays'].find_one({"_id": ObjectId(overlay_id)})
    if overlay:
        overlay["_id"] = str(overlay["_id"])
        return jsonify(overlay), 200
    return jsonify({"error": "Overlay not found"}), 404

# Route to update an overlay by ID
@api.route("/overlays/<overlay_id>", methods=["PUT"])
def update_overlay(overlay_id):
    data = request.get_json()
    update_fields = {
        "content": data.get("content"),
        "position": data.get("position"),
        "size": data.get("size")
    }
    result = db['overlays'].update_one(
        {"_id": ObjectId(overlay_id)},
        {"$set": update_fields}
    )
    if result.matched_count > 0:
        return jsonify({"message": "Overlay updated"}), 200
    return jsonify({"error": "Overlay not found"}), 404

# Route to delete an overlay by ID
@api.route("/overlays/<overlay_id>", methods=["DELETE"])
def delete_overlay(overlay_id):
    result = db['overlays'].delete_one({"_id": ObjectId(overlay_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Overlay deleted"}), 200
    return jsonify({"error": "Overlay not found"}), 404

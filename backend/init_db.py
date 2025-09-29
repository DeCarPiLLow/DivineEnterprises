#!/usr/bin/env python3
"""
Database initialization script for Solar Square application
Run this script to create the database and tables
"""

from app import create_app, db
from models.userModel import User
from werkzeug.security import generate_password_hash
import sys

app = create_app()

def init_database():
    """Initialize the database with tables and default admin user"""
    try:
        with app.app_context():
            # Create all tables
            db.create_all()
            print("✅ Database tables created successfully!")
            
            # Check if admin user already exists
            admin = User.query.filter_by(username='admin').first()
            
            if not admin:
                # Create default admin user
                admin = User(
                    username='admin',
                    email='admin@solar.com',
                    password_hash=generate_password_hash('admin123'),
                    phone='9305342637',
                    is_admin=True
                )
                db.session.add(admin)
                db.session.commit()
                print("✅ Default admin user created!")
                print("   Username: admin")
                print("   Password: admin123")
                print("   Email: admin@solarsquare.com")
            else:
                print("ℹ️  Admin user already exists")
                
            # Create a test user
            test_user = User.query.filter_by(username='testuser').first()
            if not test_user:
                test_user = User(
                    username='testuser',
                    email='test@example.com',
                    password_hash=generate_password_hash('test123'),
                    phone='0000000000',
                    is_admin=False
                )
                db.session.add(test_user)
                db.session.commit()
                print("✅ Test user created!")
                print("   Username: testuser")
                print("   Password: test123")
                print("   Email: test@example.com")
            else:
                print("ℹ️  Test user already exists")
                
            print("\n🎉 Database initialization completed successfully!")
            print("\nNext steps:")
            print("1. Make sure PostgreSQL is running")
            print("2. Update the database URI in app.py with your PostgreSQL credentials")
            print("3. Run: python app.py")
            print("4. Access the application at http://localhost:5000")
            
    except Exception as e:
        print(f"❌ Error initializing database: {str(e)}")
        print("\nPlease ensure:")
        print("1. PostgreSQL is installed and running")
        print("2. Database 'solarsquare_db' exists")
        print("3. Database credentials in app.py are correct")
        sys.exit(1)

if __name__ == '__main__':
    init_database()
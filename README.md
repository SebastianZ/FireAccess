FireAccess
==========
Extends Firebug by page accessibility checks following the Web Content Accessibility Guidelines (WCAG) 2.0.

Build XPI
---------
In order to build the FireAccess *.xpi package run the following in your command line
(you need [Apache Ant](http://ant.apache.org/))

    $ cd fireaccess
    $ ant

The *.xpi file should be located within the `./release` directory.


Run FireAccess from source
-----------------------
The directory directly contains the extension files and so, you can run
FireAccess directly from it. This is the recommended way how to quickly test your code
changes and provide a patch.

1. Locate your Firefox [profile folder](http://kb.mozillazine.org/Profile_folder)
2. Open the `extensions/` folder (create one if it doesn't exist)
3. Create a new text file and put the full path to your development folder into it.
(e.g. `C:\fireaccess\` or `~/fireaccess/`). Windows users should retain the OS'
slash direction and everyone should remember to include a closing slash and remove any
trailing spaces.
4. Save the file with the FireAccess ID (`fireaccess@getfirebug.com`) as it's name

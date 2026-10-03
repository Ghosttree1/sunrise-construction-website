<#
=====================================================================
 Sync-To-Deploy.ps1
 Copies ONLY the public/live files from your working folder into the
 clean deploy folder, so junk, drafts, backups and scripts never reach
 the live site. Run this right before you upload to Cloudflare.
---------------------------------------------------------------------
   FROM : C:\Users\ubenh\Sunrise website   (working folder)
   TO   : C:\Users\ubenh\Sunrise deploy    (clean copy you upload)

 It MIRRORS the deploy folder to match the public set: new/changed
 files are copied in, and files that no longer belong are removed from
 the deploy copy (your working folder is never modified).

 SAFE BY DEFAULT: a dry run that only shows what it *would* do.
   Preview :  powershell -ExecutionPolicy Bypass -File .\Sync-To-Deploy.ps1
   Do it   :  powershell -ExecutionPolicy Bypass -File .\Sync-To-Deploy.ps1 -Execute

 After it runs, go upload the "Sunrise deploy" folder to Cloudflare and
 Purge Everything (see HOW-TO-PUBLISH.md). This script does NOT deploy.
=====================================================================
#>

param([switch]$Execute)
$ErrorActionPreference = 'Stop'

$Src = 'C:\Users\ubenh\Sunrise website'
$Dst = 'C:\Users\ubenh\Sunrise deploy'

# Files never copied to the live site (drafts, dev, backups, tooling).
$ExcludeFiles = @(
    '*.ps1','*.md','*.backup.html','*.bak','*.orig',
    'sedGA66rV','brasada_recovered.html','index-live-reference.html',
    'community-page-template.html','sunrise-homepage-comp.html',
    'sunrise-heroes-fullpage.html','sunrise-project-aquatic-view.html',
    '.gitignore','.gitattributes'
)
# Folders never copied (backups + git internals).
$ExcludeDirs = @('recover','fixed','xp','.git','.vscode')

Write-Host '==================================================================='
Write-Host " Sync working folder  ->  deploy folder"
Write-Host (" Mode : " + ($(if($Execute){'EXECUTE (deploy folder will be updated)'}else{'DRY RUN (nothing changed)'})))
Write-Host " From : $Src"
Write-Host " To   : $Dst"
Write-Host '==================================================================='

if(-not (Test-Path $Src)){ throw "Working folder not found: $Src" }
if($Execute -and -not (Test-Path $Dst)){ New-Item -ItemType Directory -Force -Path $Dst | Out-Null }

# Build robocopy arguments.
#   /MIR  = mirror (copy new/changed, remove files that no longer belong)
#   /XF/XD = exclude the junk above
#   /L    = list only (dry run) unless -Execute
#   /NP /NDL /NFL = quieter output ; /R:1 /W:1 = don't hang on locked files
$roboArgs = @($Src, $Dst, '/MIR', '/R:1', '/W:1', '/NP')
if(-not $Execute){ $roboArgs += '/L' }
$roboArgs += '/XF'; $roboArgs += $ExcludeFiles
$roboArgs += '/XD'; $roboArgs += ($ExcludeDirs | ForEach-Object { Join-Path $Src $_ })

if(-not $Execute){ Write-Host "`n(dry run) Files that WOULD be copied or removed:" }
else            { Write-Host "`nCopying..." }

& robocopy @roboArgs
$rc = $LASTEXITCODE   # robocopy: 0-7 = success, 8+ = error

Write-Host ""
if($rc -ge 8){
    throw "robocopy reported a problem (exit code $rc). Nothing to worry about in your working folder - re-run the dry run and check."
}

# Quick sanity check of the deploy folder (only meaningful after -Execute).
if($Execute){
    $htmlCount = (Get-ChildItem $Dst -Filter *.html -File -ErrorAction SilentlyContinue).Count
    Write-Host "Deploy folder now has $htmlCount public .html pages."
    foreach($must in @('index.html','sitemap.xml','robots.txt','_redirects','nav-mobile.js')){
        $ok = Test-Path (Join-Path $Dst $must)
        Write-Host ("  {0,-14}: {1}" -f $must, ($(if($ok){'present'}else{'MISSING - check this'})))
    }
    Write-Host "  images folder : $($(if(Test-Path (Join-Path $Dst 'images')){'present'}else{'MISSING - check this'}))"
    Write-Host "`nDONE. Next: upload the 'Sunrise deploy' folder to Cloudflare, then Caching -> Purge Everything."
} else {
    Write-Host "DRY RUN complete - nothing changed. Re-run with -Execute to update the deploy folder."
}
Write-Host "This script does NOT deploy. Your working folder was not modified."

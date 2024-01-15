. .\BuildFunctions.ps1

$startTime = 
$verbosity = "m"
$version = $env:Version
$base_dir = resolve-path .\
$nuget_source_Url = "https://api.nuget.org/v3/index.json"
$projectName = "FormToastHelper"
$nugetApiKey = $env:NUGET_API_KEY
$projectConfig = $env:BuildConfiguration
$framework = "net7.0"

$build_dir = "$base_dir\build"
$test_dir = "$build_dir\test"
    
if ([string]::IsNullOrEmpty($version)) { $version = "1.0.0"}
if ([string]::IsNullOrEmpty($projectConfig)) {$projectConfig = "Release"}
 
Function Init {
    rd $build_dir -recurse -force  -ErrorAction Ignore
	md $build_dir > $null

	$solutionPath = Join-Path -Path $base_dir -ChildPath "$projectName.sln"

	if (Test-Path $solutionPath -PathType Leaf) {
        exec {
            & dotnet clean $solutionPath -nologo -v $verbosity
        }

        exec {
            & dotnet restore $solutionPath -nologo --interactive -v $verbosity
        }
    } else {
        throw "Solution file not found at path: $solutionPath"
    }
    
    Write-Host $projectConfig
}

Function Compile{
	exec {
        & dotnet build $base_dir\$projectName.sln -nologo --no-restore -v $verbosity -maxcpucount --configuration $projectConfig --no-incremental /p:Version=$version /p:Authors="Kyree Henry" /p:Product="FormToastHelper"
    }
}

Function Package{
	Write-Output "Packaging NuGet package: $projectName"
	dotnet tool install --global Octopus.DotNet.Cli | Write-Output $_ -ErrorAction SilentlyContinue #prevents red color is already installed
    
	exec{
		& dotnet pack -c Release --no-build /p:PackageVersion=$version
	}
}

Function Push{
	Write-Output "Pushing NuGet package: $projectName version $version"
	exec{
		& dotnet nuget push -k $nugetApiKey -k $nugetApiKey 
	}
}

Function PrivateBuild{
	$projectConfig = "Debug"
	$sw = [Diagnostics.Stopwatch]::StartNew()
	Init
	Compile
	$sw.Stop()
	write-host "Build time: " $sw.Elapsed.ToString()
}

Function CIBuild{
	$sw = [Diagnostics.Stopwatch]::StartNew()
	Init
	Compile
	Package
	Push
	$sw.Stop()
	write-host "Build time: " $sw.Elapsed.ToString()
}
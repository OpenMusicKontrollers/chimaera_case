<?xml version="1.0" encoding="UTF-8"?>

<!--
	Copyright (c) 2014 Hanspeter Portner (dev@open-music-kontrollers.ch)
	
	This documentation describes Open Hardware and is licensed under the
	CERN OHL v.1.2. You may redistribute and modify this documentation
	under the terms of the CERN OHL v.1.2. (http://ohwr.org/cernohl). This
	documentation is distributed WITHOUT ANY EXPRESS OR IMPLIED WARRANTY,
	INCLUDING OF MERCHANTABILITY, SATISFACTORY QUALITY AND FITNESS FOR A
	PARTICULAR PURPOSE. Please see the CERN OHL v.1.2 for applicable
	conditions.
-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:svg="http://www.w3.org/2000/svg">
	<xsl:output omit-xml-declaration="no" indent="yes"/>
	
	<xsl:param name="new_width" select="'181'"/>
	<xsl:param name="new_height" select="'181'"/>

	<xsl:param name="new_viewBox" select="concat('0 0 ',$new_width,' ',$new_height)"/>
	<xsl:param name="add_transform" select="' translate(10,-10)'"/>
	
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>

	<xsl:template match="svg:svg/@width">
		<xsl:attribute name="width">
			<xsl:value-of select="concat($new_width,'mm')"/>
		</xsl:attribute>
	</xsl:template>

	<xsl:template match="svg:svg/@height">
		<xsl:attribute name="height">
			<xsl:value-of select="concat($new_height,'mm')"/>
		</xsl:attribute>
	</xsl:template>

	<xsl:template match="svg:svg/@viewBox">
		<xsl:attribute name="viewBox">
			<xsl:value-of select="$new_viewBox"/>
		</xsl:attribute>
	</xsl:template>

	<xsl:template match="svg:svg/svg:g/@transform">
		<xsl:attribute name="transform">
			<xsl:value-of select="."/>
			<xsl:value-of select="$add_transform"/>
		</xsl:attribute>
	</xsl:template>

</xsl:stylesheet>
